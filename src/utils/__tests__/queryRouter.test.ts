import { describe, it, expect } from 'vitest';
import { routeQuery, RouteResult } from '../queryRouter';

describe('queryRouter', () => {
  describe('routeQuery function', () => {
    it('should route a portfolio query to portfolio route', () => {
      const result = routeQuery('show me your portfolio');
      expect(result.route).toBe('portfolio');
      expect(result.confidence).toBeGreaterThan(0);
      expect(result.matchedKeywords).toContain('portfolio');
    });

    it('should route a skills query to skills route', () => {
      const result = routeQuery('what are your skills');
      expect(result.route).toBe('skills');
      expect(result.confidence).toBeGreaterThan(0);
      expect(result.matchedKeywords).toContain('skills');
    });

    it('should route a contact query to contact route', () => {
      const result = routeQuery('how can I contact you');
      expect(result.route).toBe('contact');
      expect(result.confidence).toBeGreaterThan(0);
      expect(result.matchedKeywords).toContain('contact');
    });

    it('should route a projects query to projects route', () => {
      const result = routeQuery('tell me about your projects');
      expect(result.route).toBe('projects');
      expect(result.confidence).toBeGreaterThan(0);
      expect(result.matchedKeywords).toContain('projects');
    });

    it('should route an experience query to experience route', () => {
      const result = routeQuery('what is your work experience');
      expect(result.route).toBe('experience');
      expect(result.confidence).toBeGreaterThan(0);
      expect(result.matchedKeywords).toContain('experience');
    });

    it('should route a bio query to bio route', () => {
      const result = routeQuery('tell me about yourself');
      expect(result.route).toBe('bio');
      expect(result.confidence).toBeGreaterThan(0);
      expect(result.matchedKeywords.length).toBeGreaterThan(0);
    });

    it('should return unknown route when no keywords match', () => {
      const result = routeQuery('what is the weather today');
      expect(result.route).toBe('unknown');
      expect(result.confidence).toBeLessThanOrEqual(0);
    });

    it('should handle multiple matching keywords and select highest confidence match', () => {
      const result = routeQuery('I have a project and would like to know about your experience');
      expect(['projects', 'experience']).toContain(result.route);
      expect(result.matchedKeywords.length).toBeGreaterThan(0);
    });

    it('should be case insensitive', () => {
      const result1 = routeQuery('SHOW ME YOUR PORTFOLIO');
      const result2 = routeQuery('show me your portfolio');
      const result3 = routeQuery('Show Me Your Portfolio');
      expect(result1.route).toBe(result2.route);
      expect(result2.route).toBe(result3.route);
      expect(result1.route).toBe('portfolio');
    });

    it('should return all matched keywords for a query', () => {
      const result = routeQuery('contact me about your projects and experience');
      expect(result.matchedKeywords).toEqual(expect.arrayContaining(['contact', 'projects', 'experience']));
      expect(result.matchedKeywords.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('RouteResult interface', () => {
    it('should have required properties', () => {
      const result = routeQuery('show me your portfolio');
      expect(result).toHaveProperty('route');
      expect(result).toHaveProperty('confidence');
      expect(result).toHaveProperty('matchedKeywords');
    });

    it('should have matchedKeywords as an array', () => {
      const result = routeQuery('show me your portfolio');
      expect(Array.isArray(result.matchedKeywords)).toBe(true);
    });

    it('should have confidence as a number', () => {
      const result = routeQuery('show me your portfolio');
      expect(typeof result.confidence).toBe('number');
    });
  });
});
