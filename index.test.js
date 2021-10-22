const request = require('supertest')
const {server} = require('./index')
const db = require('./db/db')
let id = ''
beforeAll(async () => {
  await db.connect()
})
afterAll(async () => {
  await db.close()
  await server.close()
})
describe('Products', () => {
	it('Should Populate Products', () => {
		return request(server) 
		.get('/api/init/populate')
		.expect('Content-Type', /json/)
		.expect(200)
		.then(response=>{
			expect(response.body).toEqual(
				expect.objectContaining({
					upload:expect.any(String)
				})
			)
		})
	})

	it('Should Get Products', () => {
		return request(server) 
		.get('/api/init')
		.expect('Content-Type',/json/)
		.expect(200)
		.then(response=>{
			expect(response.body.docs).toEqual(
				expect.arrayContaining([
					expect.objectContaining({
						name:expect.any(String),
						code:expect.any(String),
						price: expect.any(Number)
					})
				])
			)
			
		})
	})
	
	it('Should Create Product', () => {
		return request(server) 
		.post('/api/init')
		.send({
			name: 'Test test 3 Facebook image campaign',
            description: '',
            code: 'TEST_IMG_121',
		})
		.expect('Content-Type',/json/)
		.expect(200)
		.then(response=>{
			id = response.body._id
			expect(response.body).toEqual(
				expect.objectContaining({
					name:expect.any(String),
					code:expect.any(String),
					price: expect.any(Number)
				})
			) 
		})
	})
	
	it('Should Edit Product', () => {
		return request(server) 
		.put('/api/init/' + id)
		.send({
			name: 'Test test 1233 Facebook image campaign',
            code: 'TEST_IMG_121',
			price: 2000
		})
		.expect('Content-Type',/json/)
		.expect(200)
		.then(response=>{
			expect(response.body).toEqual(
				expect.objectContaining({
					name:expect.any(String),
					code:expect.any(String),
					price: expect.any(Number)
				})
			)
		})
	})
	
	it('Should delete Product', () => {
		return request(server) 
		.delete('/api/init/' + id)
		.expect('Content-Type',/json/)
		.expect(200)
		.then(response=>{
			expect(response.body).toEqual(
				expect.objectContaining({
					n:expect.any(Number),
					ok:expect.any(Number),
					deletedCount: expect.any(Number)
				})
			)
			id = null
		})
	})
})