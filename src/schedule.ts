import scheduler, { RecurrenceRule } from 'node-schedule'
import { Observable, Subscriber } from 'rxjs'

export default function schedule<T>(
    rule: string | RecurrenceRule,
    generator: () => Promise<T | undefined>
): Observable<T> {
    return new Observable((receiver: Subscriber<T>) => {
        const run = async () => {
            const value = await generator()
            if (value) {
                receiver.next(value)
            }
        }

        let schedule = scheduler.scheduleJob(rule, run)
        run()

        return () => schedule.cancel()
    })
}
