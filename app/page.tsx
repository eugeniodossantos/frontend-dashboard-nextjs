'use client';

import { useEffect, useMemo, useState } from 'react';

type User = {
  id: number;
  name: string;
  email: string;
  company?: { name: string };
};

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    async function loadUsers() {
      try {
        setLoading(true);
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) throw new Error('Falha ao carregar dados.');
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro inesperado.');
      } finally {
        setLoading(false);
      }
    }
    loadUsers();
  }, []);

  const filtered = useMemo(() => {
    const term = query.toLowerCase().trim();
    if (!term) return users;
    return users.filter((user) =>
      [user.name, user.email, user.company?.name ?? ''].some((value) =>
        value.toLowerCase().includes(term)
      )
    );
  }, [users, query]);

  return (
    <main className="shell">
      <aside className="sidebar">
        <div className="brand">NOVA</div>
        <nav>
          <a className="active">Dashboard</a>
          <a>Utilizadores</a>
          <a>Relatórios</a>
          <a>Definições</a>
        </nav>
        <div className="sidebarFooter">Frontend Portfolio</div>
      </aside>

      <section className="content">
        <header className="topbar">
          <div>
            <p className="eyebrow">VISÃO GERAL</p>
            <h1>Dashboard de Utilizadores</h1>
            <p className="muted">Exemplo de interface responsiva com consumo de API REST.</p>
          </div>
          <div className="avatar">EF</div>
        </header>

        <section className="cards">
          <article className="card">
            <span>Total de utilizadores</span>
            <strong>{users.length}</strong>
            <small>Dados obtidos via REST API</small>
          </article>
          <article className="card">
            <span>Resultados visíveis</span>
            <strong>{filtered.length}</strong>
            <small>Filtro em tempo real</small>
          </article>
          <article className="card">
            <span>Estado da API</span>
            <strong>{loading ? '...' : error ? 'Erro' : 'Online'}</strong>
            <small>Tratamento de loading e erros</small>
          </article>
        </section>

        <section className="panel">
          <div className="panelHeader">
            <div>
              <h2>Utilizadores</h2>
              <p className="muted">Pesquisa por nome, email ou empresa.</p>
            </div>
            <input
              aria-label="Pesquisar utilizadores"
              placeholder="Pesquisar..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>

          {loading && <div className="state">A carregar utilizadores...</div>}
          {error && <div className="state error">{error}</div>}
          {!loading && !error && (
            <div className="tableWrap">
              <table>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Empresa</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((user) => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.company?.name ?? '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filtered.length === 0 && <div className="state">Nenhum resultado encontrado.</div>}
            </div>
          )}
        </section>
      </section>
    </main>
  );
}