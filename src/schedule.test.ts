import lolex from 'lolex'
import schedule from './schedule'

const tick = async () => new Promise(done => process.nextTick(done))

describe(schedule, () => {
    let clock: lolex.Clock

    beforeEach(() => {
        clock = lolex.install()
    })

    afterEach(() => {
        clock.uninstall()
    })

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

    it('calls regulary the generator', async done => {
        const fn = jest.fn(async () => 0)
        const obs = schedule('* * * * * *', fn)
        obs.subscribe(() => {})

        await tick()
        expect(fn).toHaveBeenCalledTimes(1)

        fn.mockClear()
        clock.tick(3000)
        expect(fn).toHaveBeenCalledTimes(3)

        done()
    })
})
