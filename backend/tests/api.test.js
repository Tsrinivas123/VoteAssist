const request = require('supertest');
const app = require('../src/index');

describe('Eligibility API', () => {
  it('should return eligible for 18 year old citizen', async () => {
    const res = await request(app)
      .post('/api/eligibility')
      .send({ age: 18, isCitizen: true });
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.isEligible).toBe(true);
    expect(res.body.nextStep).toContain('Form 6');
  });

  it('should return ineligible for 17 year old citizen', async () => {
    const res = await request(app)
      .post('/api/eligibility')
      .send({ age: 17, isCitizen: true });
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.isEligible).toBe(false);
    expect(res.body.nextStep).toContain('wait 1 more year(s)');
  });

  it('should return ineligible for non-citizen', async () => {
    const res = await request(app)
      .post('/api/eligibility')
      .send({ age: 25, isCitizen: false });
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.isEligible).toBe(false);
    expect(res.body.nextStep).toContain('Only Indian citizens');
  });

  it('should return 400 for invalid input', async () => {
    const res = await request(app)
      .post('/api/eligibility')
      .send({ age: 'twenty', isCitizen: true });
    
    expect(res.statusCode).toEqual(400);
  });
});
