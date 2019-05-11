import React from 'react'
import PropTypes from 'prop-types'
import { kea } from 'kea'

const indexLogic = kea({
  // path: () => ['kea', 'index'],
  actions: () => ({
    increment: amount => ({ amount }),
    decrement: amount => ({ amount })
  }),
  reducers: ({ actions }) => ({
    counter: [
      0,
      PropTypes.number,
      {
        [actions.increment]: (state, payload) => state + payload.amount,
        [actions.decrement]: (state, payload) => state - payload.amount
      }
    ]
  }),
  selectors: ({ selectors }) => ({
    doubleCounter: [
      () => [selectors.counter],
      counter => counter * 2,
      PropTypes.number
    ]
  })
})

function Index ({ counter, doubleCounter, actions: { increment, decrement }}) {
  return (
    <div>
      <p>Counter: {counter}</p>
      <p>Double Counter: {doubleCounter}</p>
      <button type="button" onClick={() => increment(1)}>
        Increment
      </button>
      <button type="button" onClick={() => decrement(1)}>
        Decrement
      </button>
    </div>
  )
}

Index.getInitialProps = async function (ctx) {
  console.log('Index.getInitialProps')
  console.log(ctx)
  ctx.store.dispatch(indexLogic.actions.increment(1))
}

export default indexLogic(Index)