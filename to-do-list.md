
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


## 18 de janeiro de 2024
  * [x] Tarefa 1: Rios
    * Adicionar polilinhas de rios.
      * Resolvido em 19/01/24.
  * [X] Tarefa 2: Charts
      * Os dados não estão indo para os charts.
          19/01/24 - Resolvido atualizando a shape de unidades hidrográficas que no banco ainda não tinha as vazões mensais (Qmm_jan, ...).

## 24 de janeiro de 2024

  * [ ] Tafera - Limpar mapa - Rios
    * Ao buscar nova  coordenada limpar o mapa das shapes de rios solicitada anteriormente.
        * 
## 02 de Abril de 2024
  * [X] A servidora Jéssica verifica erro na coordenada: -16.049001, -47.380521.
    * Foi revisto o método de união de polígonos.
## 24 de Junho de 2024
  * [] Erro descrito pela Magda devido à atualização da biblioteca Turf. Sendo assim modifiquei para a versão 6.5.0, não mais latest version automático.

