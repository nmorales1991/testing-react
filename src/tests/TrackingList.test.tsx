import React from 'react';
import {act, fireEvent, render, screen, waitFor} from '@testing-library/react';
import TrackingList from '../TrackingList';
import {rest} from 'msw';
import {setupServer} from 'msw/node'
import List from "../List";
import App from "../App";

const server = setupServer(
  rest.get('https://jsonplaceholder.typicode.com/todos/2', (req, res, ctx) => {
    return res(ctx.status(200),ctx.json({
      "userId": 13,
      "id": 12,
      "title": "hi",
      "completed": true
    }))
  }),
);

beforeAll(() => server.listen({ onUnhandledRequest: 'bypass' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Tracking List Test', () => {

  test('handles server success', async () => {
    render(<TrackingList/>);
    // @ts-ignore
    expect(screen.queryByText('heading', {level:1, name:"hi"})).not.toBeInTheDocument();
    expect(await screen.findByRole('heading', {level:1, name:"hi"})).toBeInTheDocument();
  });

});
