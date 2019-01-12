import schedule from './schedule'

describe(schedule, () => {
    it('creates an observable and runs it once', async done => {
        const obs = schedule('0 * * * * *', () => Promise.resolve(1))
        obs.subscribe(v => {
            expect(v).toEqual(1)
            done()
        })
    })
})
