const TabelaDePrecos = {
    cafe: { valor: '3,00' },
    chantily: { valor: '1,50' },
    suco: { valor: '6,20' },
    sanduiche: { valor: '6,50' },
    queijo: { valor: '2,00' },
    salgado: { valor: '7,25' }
};

class CompraSimples {
    constructor(metodoDePagamento, string) {
        this.tabelaDePrecos = TabelaDePrecos;
        this.formaDePagamento = metodoDePagamento;
        this.quantidade = string[0].replace(/[^0-9]/g, '');
        this.produto = string[0].replace(/[^a-z]/g, '')
        this.preco = TabelaDePrecos[this.produto].valor
        this.numeroDecimal = parseFloat(this.preco.replace(',', '.'));
        this.resultado = this.numeroDecimal * this.quantidade;
    }

    compraDebito() {
        const numeroString = this.resultado.toFixed(2);
        const numeroFormatado = numeroString.replace('.', ',');
        return `R$ ${numeroFormatado}`
    }

    compraDinheiro() {
        const descontoPercentual = 5;
        const valorDesconto = (this.resultado * descontoPercentual) / 100;
        const valorComDesconto = this.resultado - valorDesconto;
        const numeroString = valorComDesconto.toFixed(2);
        const numeroFormatado = numeroString.replace('.', ',');
        return `R$ ${numeroFormatado}`
    }

    compraCredito() {
        const acrescimoPercentual = 3;
        const valorAcrescimo = (this.resultado * acrescimoPercentual) / 100;
        const numeroString = (this.resultado + valorAcrescimo).toFixed(2);
        const numeroFormatado = numeroString.replace('.', ',');
        return `R$ ${numeroFormatado}`
    }
}



class CaixaDaLanchonete {

    calcularValorDaCompra(metodoDePagamento, itens) {
        if (metodoDePagamento !== 'debito' && metodoDePagamento !== 'credito' && metodoDePagamento !== 'dinheiro') {
            return 'Forma de pagamento inválida!';
        }

        if (itens.length == 0) {
            return "Não há itens no carrinho de compra!";
        }

        if (itens.length == 1 && metodoDePagamento === 'debito') {
            const resultado = new CompraSimples(metodoDePagamento, itens)
            return resultado.compraDebito()
        }

        if (itens.length == 1 && metodoDePagamento === 'dinheiro') {
            const resultado = new CompraSimples(metodoDePagamento, itens)
            return resultado.compraDinheiro()
        }

        if (itens.length == 1 && metodoDePagamento === 'credito') {
            const resultado = new CompraSimples(metodoDePagamento, itens)
            return resultado.compraCredito()
        }

    }

}

/* const result = new CaixaDaLanchonete;

console.log(result.calcularValorDaCompra('dinheiro', ['cafe,1'])) */

export { CaixaDaLanchonete };
