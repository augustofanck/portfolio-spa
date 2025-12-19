## Notas de Engenharia

Aqui é onde eu tento soar menos “dev de tutorial” e mais **dev que pensa produto**.

### Padrões que eu uso

- **Consistência de payload** em formulários dinâmicos (ex.: `itens[index][campo]`)
- **Anti-duplicidade** (front + validação server-side na vida real)
- **UX para estados** (loading, erro, vazio, sucesso)
- **Evolução sem quebrar**: manter contratos de dados estáveis

### Exemplo: itens de orçamento

**Problema:** duplicidade + total inconsistente  
**Mitigação:** bloquear no front, recomputar total, validar no back  
**V2:** testes e2e e logs de inconsistência
