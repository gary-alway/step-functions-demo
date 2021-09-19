import { StepFunctions } from 'aws-sdk'
import waitForExpect from 'wait-for-expect'

jest.setTimeout(10000)

const stepFunctionsClient = new StepFunctions({
  region: 'us-east-1',
  endpoint: 'http://localhost:8083'
})

describe('step functions', () => {
  it('simple step function workflow', async () => {
    const { executionArn } = await stepFunctionsClient
      .startExecution({
        stateMachineArn:
          'arn:aws:states:us-east-1:101010101010:stateMachine:Machine',
        input: JSON.stringify({
          number: 123
        })
      })
      .promise()

    await waitForExpect(
      async () => {
        const { status } = await stepFunctionsClient
          .describeExecution({ executionArn })
          .promise()
        expect(status).toBe('SUCCEEDED')
      },
      8000,
      200
    )
  })
})
