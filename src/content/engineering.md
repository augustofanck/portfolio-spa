# Notas de Engenharia

É neste espaço que você consegue visualizar diretamente a forma como eu penso durante a produção de novas aplicações. Buscando sempre uma consistência e um padrão lógico.

## Padrões que eu uso

- **Consistência de payload** em formulários dinâmicos (ex.: `itens[index][campo]`)
- **Anti-duplicidade** (front + validação server-side na vida real)
- **UX para estados** (loading, erro, vazio, sucesso)
- **Evolução sem quebrar**: manter contratos de dados estáveis

## Exemplo: itens de orçamento

**Problema:** duplicidade + total inconsistente  
**Mitigação:** bloqueio no front + recomputar total + validação no back  
**V2:** testes e2e e logs de inconsistência
