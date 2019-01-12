import schedule from './schedule'

const tick = async () => new Promise(done => process.nextTick(done))

describe(schedule, () => {
    it('creates an observable and runs it once', async done => {
        const fn = jest.fn()
        const obs = schedule('0 * * * * *', async () => 1)
        obs.subscribe(fn)

        await tick()
        expect(fn).toHaveBeenCalledWith(1)
        done()
    })

    it("doesn't call an observable if method resolves to undefined", async done => {
        const fn = jest.fn()
        const obs = schedule('0 * * * * *', async () => undefined)
        obs.subscribe(fn)

        await tick()
        expect(fn).not.toHaveBeenCalled()
        done()
    })
})
