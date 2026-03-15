import { NavLink, Outlet } from 'react-router-dom'

export function RootLayout() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-header__inner">
          <div className="app-brand">My React App</div>
          <nav className="app-nav">
            <NavLink to="/" end>
              首页
            </NavLink>
            <NavLink to="/about">关于</NavLink>
          </nav>
        </div>
      </header>
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  )
}

