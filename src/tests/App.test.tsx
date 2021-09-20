import React from 'react';
import {rest} from 'msw';
import {setupServer} from 'msw/node'
import {act, fireEvent, render, screen, waitFor} from '@testing-library/react'
import App from '../App';
import '@testing-library/jest-dom'

const server = setupServer(
  rest.get('https://jsonplaceholder.typicode.com/todos/1', (req, res, ctx) => {
      return res(ctx.json({
        "userId": 1,
        "id": 1,
        "title": "nicolás morales",
        "completed": false
      }))
  }),
);

beforeAll(() => server.listen({ onUnhandledRequest: 'bypass' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('App Test', () => {
  test('handles server success', async () => {
    // @ts-ignore
    await act(async () => render(<App/>));
    const button = screen.getByText('Fetch');
    await act(async () => {
      fireEvent.click(button);
    })
    await waitFor(() => screen.getByRole('title'))
    expect(screen.getByRole('title')).toHaveTextContent('nicolás morales')
  });

  test('handles server error', async () => {
    server.use(
      rest.get('https://jsonplaceholder.typicode.com/todos/1', (req, res, ctx) => {
        return res(ctx.status(404));
      }),
    )
    // @ts-ignore
    await act(async () => render(<App/>));
    const button = screen.getByText('Fetch');
    await act(async () => {
      fireEvent.click(button);
    })
    await waitFor(() => screen.getByRole('error'))
    expect(screen.getByRole('error')).toHaveTextContent('Ocurrió un error')
  });
});
