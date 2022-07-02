import { createReducer } from '@reduxjs/toolkit'
import { Field, replaceSwapState, selectCurrency, setRecipient, switchCurrencies, typeInput } from './actions'
import {GAME, USDC} from "../../constants";

export interface SwapState {
  readonly independentField: Field
  readonly typedValue: string
  readonly [Field.INPUT]: {
    readonly currencyId: string | undefined
  }
  readonly [Field.OUTPUT]: {
    readonly currencyId: string | undefined
  }
  // the typed recipient address or ENS name, or null if swap should go to sender
  readonly recipient: string | null
}

const initialState: SwapState = {
  independentField: Field.INPUT,
  typedValue: '',
  [Field.INPUT]: {
    currencyId: USDC?.address,
  },
  [Field.OUTPUT]: {
    currencyId: GAME?.address,
  },
  recipient: null,
}

export default createReducer<SwapState>(initialState, (builder) => {
      return builder
          .addCase(
              replaceSwapState,
              (state, {payload: {typedValue, recipient, field, inputCurrencyId, outputCurrencyId}}) => {
                if(!inputCurrencyId) inputCurrencyId = USDC?.address;
                if(!outputCurrencyId) outputCurrencyId = GAME?.address;
                return {
                  [Field.INPUT]: {
                    currencyId: inputCurrencyId,
                  },
                  [Field.OUTPUT]: {
                    currencyId: outputCurrencyId,
                  },
                  independentField: field,
                  typedValue,
                  recipient,
                }
              }
          )
          .addCase(selectCurrency, (state, {payload: {currencyId, field}}) => {
            const otherField = field === Field.INPUT ? Field.OUTPUT : Field.INPUT
            if (currencyId === state[otherField].currencyId) {
              // the case where we have to swap the order
              return {
                ...state,
                independentField: state.independentField === Field.INPUT ? Field.OUTPUT : Field.INPUT,
                [field]: {currencyId},
                [otherField]: {currencyId: state[field].currencyId},
              }
            }
            // the normal case
            return {
              ...state,
              [field]: {currencyId},
            }
          })
          .addCase(switchCurrencies, (state) => {
            return {
              ...state,
              independentField: state.independentField === Field.INPUT ? Field.OUTPUT : Field.INPUT,
              [Field.INPUT]: {currencyId: state[Field.OUTPUT].currencyId},
              [Field.OUTPUT]: {currencyId: state[Field.INPUT].currencyId},
            }
          })
          .addCase(typeInput, (state, {payload: {field, typedValue}}) => {
            return {
              ...state,
              independentField: field,
              typedValue,
            }
          })
          .addCase(setRecipient, (state, {payload: {recipient}}) => {
            state.recipient = recipient
          })
    }
)
