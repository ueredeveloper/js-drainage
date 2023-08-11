### Js Drainage
### Calcula áreas de contribuição e outorgas dentro destes polígonos.




30/06/22
* Adicionar as vazões outorgadas de cada usuário na tabela de outorgados.
  * RESOLVIDO em 01/07/22.
    
* Erro: repetindo usuários ao clicar duas vezes na mesma coordenada.
  * Em 01/07/22 o evento não foi constatado outra vez, esperar mais testes.
    
* Casos de nascentes: A linha `QOUTORGÁVEL-INDIVIDUAL-SEÇÃO (20% QOUTORGÁVEL-SEÇÃO)` em que se calcula 20% da vazão outorgável na seção também é utilizada caculando 80% da vazão outorgável na seção - 80% da `QOUTORGÁVEL-SEÇÃO - 80%`. É necessário então poder mudar o cálculo de `* 0.20` para `* 0.80`.
  * RESOLVIDO em 05/07/22. Foi adicionado quatro possibilidades (20%, 70%, 80% e 90%).
  
* Deixar por padrão os campos do chart no gráfico (chart line) `Análise de Seção de Captação Q20 da Q80 e Q80 - out` ocultos. O mesmo no gráfico `Análise da Unidade Hidrográfica` `Q20 da Q UH` e `Q80 Q out`.
  * RESOLVIDO em 01/07/22. Solicitação feita pelo Saulo por email.

14/12/2022
Buscar outra forma de trazer os pontos pois o porta (gis.adasa...) está funcionando localmente, apenas dentro da adasa.

02/03/23
É preciso adicionar um ouvinte de cliques. Os cálculos só estão sendo atualizados quando o usuário utiliza  a tecla `tab`.




