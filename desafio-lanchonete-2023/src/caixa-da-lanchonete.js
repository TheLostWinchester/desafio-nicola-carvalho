class CaixaDaLanchonete {
    calcularValorDaCompra(formaDePagamento, itens) {
        //Gerando Cardápio
        const bibliotecaDoCardapio = {
            'cafe': 3.00,
            'chantily': 1.50,
            'suco': 6.20,
            'sanduiche': 6.50,
            'queijo': 2.00,
            'salgado': 7.25,
            'combo1': 9.50,
            'combo2': 7.50
        };
        //Inserindo formas válidas de pagamento
        const formaPagamento = ['dinheiro', 'debito', 'credito'];
        //Validação do Pagamento
        if (formaPagamento.includes(formaDePagamento) == false) {
            return 'Forma de pagamento inválida!';
        }
        //Validando carrinho vazio
        if (itens.length === 0) {
            return 'Não há itens no carrinho de compra!';
        }
        //Criando comanda com os pedidos realizados
        let precos = []
        for (const item in bibliotecaDoCardapio) {
            precos[item] = bibliotecaDoCardapio[item];
        }

        var todosItens = [];
        let valorTotal = 0;
        //Confere os itens do pedido e calcula o valor total
        for (const itemData of itens) {
            const [codigoItens, quant] = itemData.split(',');
            todosItens.push(codigoItens);

            if (!(codigoItens in precos)) {
                return 'Item inválido!';
            }

            const quantParseada = parseInt(quant);
            if (isNaN(quantParseada) || quantParseada <= 0) {
                return 'Quantidade inválida!';
            }


            valorTotal += bibliotecaDoCardapio[codigoItens] * quantParseada;
        }
        //Valida e retorna erro caso extras sejam pedidos sem o item principal
        if ((todosItens.includes('chantily') && !(todosItens.includes('cafe') || todosItens.includes('combo2'))) ||
            (todosItens.includes('queijo') && !(todosItens.includes('sanduiche') || todosItens.includes('combo1') || todosItens.includes('combo2')))) {
            return 'Item extra não pode ser pedido sem o principal';
        }
        //Calculando acréscimos e descontos baseado na forma de pagamento
        if (formaDePagamento === 'dinheiro') {
            valorTotal *= 0.95;
        } else if (formaDePagamento === 'credito') {
            valorTotal *= 1.03;
        }
        //Enviando valor reduzindo para duas casas decimais
        return `R$ ${valorTotal.toFixed(2)}`.replace('.', ',');
    }
}

export { CaixaDaLanchonete };