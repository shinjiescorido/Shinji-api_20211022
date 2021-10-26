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

	describe('Migration', () => {
		it('success', () => {
			return request(server)
			.get('/api/init/populate')
			.expect('Content-Type', /json/)
			.expect(200)
			.then(response=>{
				expect(response.body).toEqual({
					"upload": "ok"
				})
			})
		})
	})

	describe('read', () => {
		it('sucess', () => {
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
	})

	describe('create', () => {
		it('success', () => {
			return request(server)
			.post('/api/init')
			.send({
				name: 'Test test 3 Facebook image campaign',
				price: 200,
				code: 'TEST_IMG_121'
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

		it('fail', () => {
			return request(server)
			.post('/api/init')
			.send({
				name: 'Test test 3 Facebook image campaign',
				code: 'TEST_IMG_121'
			})
			.expect('Content-Type',/json/)
			.expect(401)
			.then(response=>{
				expect(response.body).toEqual({
					status: 401,
					message: "\"price\" is required"
				}) 
			})
		})
	})

	describe('edit', () => {
		it('success', () => {
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

		it('fail', () => {
			return request(server)
			.put('/api/init/asdsad')
			.send({
				name: 'Test test 1233 Facebook image campaign',
				code: 'TEST_IMG_121',
				price: 2000
			})
			.expect('Content-Type',/json/)
			.expect(401)
			.then(response=>{
				expect(response.body).toEqual( {
					status: 401,
					message: '"id" with value "asdsad" fails to match the valid mongo id pattern'
				})
			})
		})
	})

	describe('delete', () => {
		it('success', () => {
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

		it('fail', () => {
			return request(server)
			.delete('/api/init/asdasd')
			.expect('Content-Type',/json/)
			.expect(401)
			.then(response=>{
				expect(response.body).toEqual({
					status: 401,
					message: '"id" with value "asdasd" fails to match the valid mongo id pattern'
				})
				id = null
			})
		})
	})

})
