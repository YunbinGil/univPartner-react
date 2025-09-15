import { http, HttpResponse } from 'msw'
import { schoolHandlers } from './schoolHandlers'
import { userHandlers } from './userHandlers'

export const handlers = [
  ...schoolHandlers,
  ...userHandlers,
]