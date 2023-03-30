import { useContext } from "react";
import { CyclesContext } from "../../contexts/CyclesContext";
import { formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/esm/locale/pt-BR";

import * as S from "./styles";

export function History() {
  const { cycles } = useContext(CyclesContext);

  return (
    <S.HistoryContainer>
      <h1>Meu histórico</h1>

      <S.HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Inicio</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map((cycle) => {
              return (
                <tr>
                  <td>{cycle.task}</td>
                  <td>{`${cycle.minutesAmount} minutos`}</td>
                  <td>
                    {formatDistanceToNow(cycle.startDate, {
                      addSuffix: true,
                      locale: ptBR,
                    })}
                  </td>
                  <td>
                    {cycle.finishedDate && (
                      <S.Status statusColor="green">Concluido</S.Status>
                    )}
                    {cycle.interruptedDate && (
                      <S.Status statusColor="red">Interrompido</S.Status>
                    )}
                    {!cycle.finishedDate && !cycle.interruptedDate && (
                      <S.Status statusColor="yellow">Em andamento</S.Status>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </S.HistoryList>
    </S.HistoryContainer>
  );
}
