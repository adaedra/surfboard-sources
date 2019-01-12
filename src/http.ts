import fetch, { Request, RequestInit, Response } from 'node-fetch'

const http = (
    url: string | Request,
    init?: RequestInit,
    transform: (_: Response) => any = res => res
) => () => fetch(url, init).then(transform)

export default http
