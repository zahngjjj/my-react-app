import { isRouteErrorResponse, useRouteError } from 'react-router-dom'

export function ErrorPage() {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return (
        <section className="page">
          <h1>404</h1>
          <p>页面不存在</p>
        </section>
      )
    }

    return (
      <section className="page">
        <h1>{error.status}</h1>
        <p>{error.statusText}</p>
      </section>
    )
  }

  return (
    <section className="page">
      <h1>出错了</h1>
      <p>请稍后重试</p>
    </section>
  )
}

