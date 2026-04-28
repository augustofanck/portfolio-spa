## Notas de Engenharia

Este espaço reúne princípios e decisões que venho aplicando em projetos reais e demos. A ideia é mostrar como penso antes de codar: quais riscos observo, como protejo dados e como transformo regra de negócio em interface previsível.

### Princípios que sigo

- **Clareza antes de abstração:** prefiro começar com uma implementação explícita e evoluir abstrações quando a repetição ou complexidade justificar.
- **Consistência de dados:** totais, saldos, status e permissões precisam ser protegidos no backend, mesmo quando a interface já ajuda o usuário.
- **UX operacional:** telas internas devem reduzir erro, dar feedback rápido e deixar o próximo passo evidente.
- **Evolução sem quebrar contratos:** quando um fluxo já existe, mudanças precisam preservar dados legados e expectativas da operação.
- **Segurança proporcional ao contexto:** autenticação, permissões, validação e controle de acesso não são detalhes finais; fazem parte do desenho do fluxo.

### Sistemas internos precisam ser previsíveis

Em sistemas operacionais, o usuário muitas vezes está trabalhando sob pressão: atendimento acontecendo, caixa fechando, pedido sendo conferido ou estoque sendo movimentado.

Por isso, eu tento construir interfaces que respondam perguntas simples:

- O que está acontecendo agora?
- Qual é o próximo passo seguro?
- O dado exibido confere com a regra de negócio?
- O usuário tem permissão para fazer essa ação?
- O sistema impede duplicidade ou inconsistência?

Essa visão apareceu no projeto `estoque-ci4`, principalmente em ordens, pagamentos, estoque e dashboard.

### Validação e consistência

Uma regra que venho reforçando: a interface pode orientar, mas o backend precisa garantir.

Exemplos práticos:

- valores monetários são normalizados antes de persistir;
- datas em formato brasileiro são convertidas para formato de banco;
- totais de ordem são recalculados a partir dos itens;
- pagamentos não devem ultrapassar o saldo da ordem;
- permissões sensíveis precisam ser validadas por rota/filtro, não só por botão escondido.

Esse cuidado evita o clássico “funcionou na tela, mas quebrou o dado”.

### Integrações e estados

Integrações raramente retornam só sucesso. Um fluxo real precisa tratar:

- carregando;
- vazio;
- erro;
- pendente;
- aprovado;
- falhou;
- nova tentativa;
- prevenção de duplicidade.

Por isso, as demos de busca assíncrona e estados de pagamento existem no portfólio: elas isolam decisões pequenas que aparecem em sistemas maiores.

### Contratos de dados

Quando módulos conversam entre si, o contrato importa. Uma ordem depende de cliente, itens, pagamentos, vendedor e status. Um item de estoque precisa ter código, preço, disponibilidade e categoria. Uma busca precisa entregar dados em formato que a UI consiga renderizar com segurança.

Quanto mais cedo esses contratos ficam claros, menos frágil fica a evolução do projeto.

### O que venho estudando e aplicando

- testes para regras de negócio críticas;
- organização de casos de uso em camadas mais claras;
- melhoria de logs e auditoria;
- design de APIs com escopo bem definido;
- interfaces internas mais densas, porém legíveis;
- documentação que ajude manutenção futura.

### Próximas evoluções

Quero evoluir este portfólio para registrar mais decisões técnicas, não apenas telas prontas. O objetivo é que cada projeto mostre três coisas:

1. o problema que existia;
2. as decisões tomadas;
3. o que eu faria diferente numa próxima versão.
