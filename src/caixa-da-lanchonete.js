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
        this.pedido = string;
        this.formaDePagamento = metodoDePagamento;
    }

    checkQuantidade() {
        const Quantidade = this.pedido.every((e) => e.replace(/[^0-9]/g, '') !== '0')
        return Quantidade
    }

    checkItem() {
        const checkItem = this.pedido.every((e) => e.replace(/[^a-z]/g, '') !== '') 
        return checkItem;
    }

    calculaItemVezesQuantidade() {
        let total = 0;

        this.pedido.forEach((e) => {
            let quantidade = e.replace(/[^0-9]/g, '');
            let produto = e.replace(/[^a-z]/g, '');
                let preco = TabelaDePrecos[produto].valor
                let numeroDecimal = parseFloat(preco.replace(',', '.'));
                let resultado = numeroDecimal * quantidade;
                total += resultado
        })
        return total;
    }

    compraDebito() {
        const calculaItemVezesQuantidade = this.calculaItemVezesQuantidade()
        if(typeof(calculaItemVezesQuantidade) == 'string') return calculaItemVezesQuantidade;
        const decimal = calculaItemVezesQuantidade.toFixed(2)
        const numeroFormatado = decimal.replace('.', ',');
        if (numeroFormatado == '0,00') return "Quantidade inválida!"
        return `R$ ${numeroFormatado}`
    }

    compraDinheiro() {
        const calculaItemVezesQuantidade = this.calculaItemVezesQuantidade()
        if(typeof(calculaItemVezesQuantidade) == 'string') return calculaItemVezesQuantidade;
        const descontoPercentual = 5;
        const valorDesconto = (calculaItemVezesQuantidade * descontoPercentual) / 100;
        const valorComDesconto = calculaItemVezesQuantidade - valorDesconto;
        const numeroString = valorComDesconto.toFixed(2);
        const numeroFormatado = numeroString.replace('.', ',');
        if (numeroFormatado == '0,00') return "Quantidade inválida!"
        return `R$ ${numeroFormatado}`
    }

    compraCredito() {
        const calculaItemVezesQuantidade = this.calculaItemVezesQuantidade()
        if(typeof(calculaItemVezesQuantidade) == 'string') return calculaItemVezesQuantidade;
        const acrescimoPercentual = 3;
        const valorAcrescimo = (calculaItemVezesQuantidade * acrescimoPercentual) / 100;
        const numeroString = (calculaItemVezesQuantidade + valorAcrescimo).toFixed(2);
        const numeroFormatado = numeroString.replace('.', ',');
        if (numeroFormatado == '0,00') return "Quantidade inválida!"
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

        if (itens.length >= 1 && metodoDePagamento === 'debito') {
            const resultado = new CompraSimples(metodoDePagamento, itens)
            if (resultado.checkItem() == false) return "Item inválido!"
            if (resultado.checkQuantidade() == false) return 'Quantidade inválida!'
            return resultado.compraDebito()
        }

        if (itens.length >= 1 && metodoDePagamento === 'dinheiro') {
            const resultado = new CompraSimples(metodoDePagamento, itens)
            if (resultado.checkItem() == false) return "Item inválido!"
            if (resultado.checkQuantidade() == false) return 'Quantidade inválida!'
            return resultado.compraDinheiro()
        }

        if (itens.length >= 1 && metodoDePagamento === 'credito') {
            const resultado = new CompraSimples(metodoDePagamento, itens)
            if (resultado.checkItem() == false) return "Item inválido!"
            if (resultado.checkQuantidade() == false) return 'Quantidade inválida!'
            return resultado.compraCredito()
        }

    }

}

/* const result = new CaixaDaLanchonete;

console.log(result.calcularValorDaCompra('dinheiro', ['cafe,1', 'salgado,1'])) */

export { CaixaDaLanchonete };
