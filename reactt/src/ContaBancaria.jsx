import { useState } from "react";

function ContaBancaria({ numero, agNumero, agNome, tipo }) {
  const [saldo, setSaldo] = useState(0);
  const [estadoConta, setEstadoConta] = useState(tipo);

  // Creditar
  const creditar = (valor) => {
    if (estadoConta === 4) {
      alert("Conta encerrada. Não é possível realizar essa operação.");
      return;
    }

    const valorNumerico = parseFloat(valor);
    if (isNaN(valorNumerico) || valorNumerico <= 0) {
      alert("Valor inválido! Digite um valor positivo.");
      return;
    }

    setSaldo(saldo + valorNumerico);
  };

  // Debitar
  const debitar = (valor) => {
    if (estadoConta === 4) {
      alert("Conta encerrada. Não é possível realizar essa operação.");
      return;
    }

    const valorNumerico = parseFloat(valor);
    if (isNaN(valorNumerico) || valorNumerico <= 0) {
      alert("Valor inválido! Digite um valor positivo.");
      return;
    }

    if (saldo - valorNumerico < 0) {
      alert("Saldo insuficiente!");
      return;
    }

    setSaldo(saldo - valorNumerico);
  };

  // Consultar Saldo
  const consultarSaldo = () => {
    alert(`Saldo atual: R$ ${saldo.toFixed(2)}`);
  };

  // Encerrar Conta
  const encerrarConta = () => {
    if (saldo < 0) {
      alert("Não é possível encerrar a conta com saldo negativo.");
      return;
    }
    setEstadoConta(4);
    alert(`Conta encerrada! Saldo final: R$ ${saldo.toFixed(2)}`);
    setSaldo(0);
  };

  // Reabrir Conta
  const reabrirConta = () => {
    if (estadoConta !== 4) {
      alert("A conta já está ativa.");
      return;
    }

    const entrada = prompt("Digite o tipo: 1 (Corrente) ou 2 (Poupança)");

    if (!entrada) {
      alert("Operação cancelada.");
      return;
    }

    const novoTipo = parseInt(entrada);

    if (![1, 2].includes(novoTipo)) {
      alert("Tipo de conta inválido. Use 1 (corrente) ou 2 (poupança).");
      return;
    }

    setEstadoConta(novoTipo);
    alert(`Conta reativada como tipo ${novoTipo}`);
  };

  return (
    <div>
      <h2>Conta Bancária</h2>
      <p>Número: {numero}</p>
      <p>Agência: {agNome} - {agNumero}</p>
      <p>Tipo: {estadoConta === 1 ? "Corrente" : estadoConta === 2 ? "Poupança" : "Encerrada"}</p>
      <p>Saldo: R$ {saldo.toFixed(2)}</p>

      <button onClick={() => creditar(prompt("Valor para creditar:"))}>
        Creditar
      </button>

      <button onClick={() => debitar(prompt("Valor para debitar:"))}>
        Debitar
      </button>

      <button onClick={consultarSaldo}>Consultar Saldo</button>

      <button onClick={encerrarConta}>Encerrar Conta</button>

      <button onClick={reabrirConta}>Reabrir Conta</button>
    </div>
  );
}

export default ContaBancaria;
