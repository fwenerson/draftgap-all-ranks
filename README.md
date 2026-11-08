# DraftGap (Fork: All Ranks & 30-Day Data)

Fork de [DraftGap](https://github.com/vigovlugt/draftgap) configurado obrigatoriamente para usar dados de **todos os ranks (`tier=all`)** e período de **30 dias (`patch=30`)** do Lolalytics, substituindo os filtros originais de Emerald+ e patch único.

## Alterações deste Fork

- **Todos os ranks (`tier=all`)**: Consultas ao Lolalytics e montagem de datasets configurados com `tier=all` em vez de `tier=emerald_plus`.
- **Período de 30 dias (`patch=30`)**: Todas as estatísticas de campeões, builds, matchups e sinergias utilizam o período consolidado de 30 dias (`patch=30`), garantindo maior amostragem e estabilidade estatística.
- **Integração atualizada com Lolalytics**: Suporte atualizado para as rotas Qwik/Mega (`https://lolalytics.com/` e `https://a1.lolalytics.com/`).
- **Frontend e Dataset alinhados**: Contexto de datasets do frontend e gerador de dataset configurados para servir os dados completos de 30 dias e todos os elos.

---

DraftGap is a site and desktop application which helps you pick and draft your League of Legends team. It suggests champions based on the meta, their matchups with every opponent champion and every ally duo. Its an unopinionated tool using only statistics to make suggestions.


