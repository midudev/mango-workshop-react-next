import { beforeAll, afterEach, afterAll } from 'vitest'

import { handlers } from './mocks/handlers.js'
import { setupServer } from 'msw/node'

const server = setupServer(...handlers)

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())