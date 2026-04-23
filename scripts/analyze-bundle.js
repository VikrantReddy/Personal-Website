#!/usr/bin/env node

import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🔍 Analyzing bundle size...\n');

try {
  // Build the project first
  console.log('📦 Building project...');
  execSync('npm run build', { stdio: 'inherit' });
  
  // Install bundle analyzer if not present
  try {
    execSync('npm list vite-bundle-analyzer', { stdio: 'ignore' });
  } catch {
    console.log('📥 Installing bundle analyzer...');
    execSync('npm install --save-dev vite-bundle-analyzer', { stdio: 'inherit' });
  }
  
  // Analyze bundle
  console.log('🔍 Analyzing bundle...');
  execSync('npx vite-bundle-analyzer dist', { stdio: 'inherit' });
  
  // Generate bundle report
  console.log('📊 Generating bundle report...');
  const report = generateBundleReport();
  writeFileSync(join(__dirname, '../bundle-report.md'), report);
  console.log('✅ Bundle report generated: bundle-report.md');
  
} catch (error) {
  console.error('❌ Bundle analysis failed:', error.message);
  process.exit(1);
}

function generateBundleReport() {
  const packageJson = JSON.parse(
    readFileSync(join(__dirname, '../package.json'), 'utf8')
  );
  
  const dependencies = Object.keys(packageJson.dependencies || {});
  const devDependencies = Object.keys(packageJson.devDependencies || {});
  
  const largeDeps = [
    'react', 'react-dom', '@radix-ui', 'lucide-react', 'recharts',
    'embla-carousel-react', 'date-fns', 'zod', 'react-hook-form'
  ];
  
  let report = `# Bundle Analysis Report\n\n`;
  report += `Generated on: ${new Date().toISOString()}\n\n`;
  
  report += `## Dependencies Analysis\n\n`;
  report += `### Production Dependencies (${dependencies.length})\n`;
  dependencies.forEach(dep => {
    const isLarge = largeDeps.some(large => dep.includes(large));
    const marker = isLarge ? '⚠️' : '✅';
    report += `- ${marker} ${dep}\n`;
  });
  
  report += `\n### Development Dependencies (${devDependencies.length})\n`;
  devDependencies.forEach(dep => {
    report += `- ${dep}\n`;
  });
  
  report += `\n## Optimization Recommendations\n\n`;
  
  if (dependencies.some(dep => dep.includes('@radix-ui'))) {
    report += `### Radix UI Components\n`;
    report += `Consider lazy loading individual Radix UI components instead of importing all:\n`;
    report += `\`\`\`tsx\n`;
    report += `// Instead of:\n`;
    report += `import { Button, Card, Dialog } from '@/components/ui';\n\n`;
    report += `// Use:\n`;
    report += `const Button = lazy(() => import('@/components/ui/button'));\n`;
    report += `const Card = lazy(() => import('@/components/ui/card'));\n`;
    report += `\`\`\`\n\n`;
  }
  
  if (dependencies.some(dep => dep.includes('lucide-react'))) {
    report += `### Icons\n`;
    report += `Use the lazy icon hook to load icons on demand:\n`;
    report += `\`\`\`tsx\n`;
    report += `import { useLazyIcon } from '@/hooks/use-lazy-icons';\n`;
    report += `const { Icon } = useLazyIcon('ArrowRight');\n`;
    report += `\`\`\`\n\n`;
  }
  
  report += `### General Tips\n`;
  report += `1. Use dynamic imports for route-based code splitting\n`;
  report += `2. Implement intersection observer for lazy loading\n`;
  report += `3. Consider using webpack-bundle-analyzer for detailed analysis\n`;
  report += `4. Monitor bundle size in CI/CD pipeline\n`;
  report += `5. Use tree-shaking friendly imports\n\n`;
  
  report += `## Performance Metrics\n\n`;
  report += `- First Contentful Paint (FCP): Target < 1.8s\n`;
  report += `- Largest Contentful Paint (LCP): Target < 2.5s\n`;
  report += `- First Input Delay (FID): Target < 100ms\n`;
  report += `- Cumulative Layout Shift (CLS): Target < 0.1\n\n`;
  
  report += `## Next Steps\n\n`;
  report += `1. Review the bundle analyzer output\n`;
  report += `2. Identify largest dependencies\n`;
  report += `3. Implement lazy loading for non-critical components\n`;
  report += `4. Consider code splitting strategies\n`;
  report += `5. Monitor performance metrics in production\n`;
  
  return report;
}

