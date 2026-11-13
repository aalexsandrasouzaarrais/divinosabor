let coneJson = [
    {
        id: 1,
        name: 'Cone trufado de Uva',
        category: 'cone',
        img: 'img/uva.png',
        price: [12.00, 15.00],
        sizes: ['Casquinha', 'Cascão'],
        description: 'Casquinha crocante recheada com um incrível brigadeiro branco artesanal e uvas frescas inteiras.'
    },
    {
        id: 2,
        name: 'Cone trufado de Morango',
        category: 'cone',
        img: 'img/morango.png',
        price: [12.00, 15.00],
        sizes: ['Casquinha', 'Cascão'],
        description: 'Casquinha crocante recheada com um incrível brigadeiro branco artesanal e morangos frescos.'
    },
    {
        id: 3,
        name: 'Cone trufado de Paçoca',
        category: 'cone',
        img: 'img/pacoca.png',
        price: [8.00, 12.00],
        sizes: ['Casquinha', 'Cascão'],
        description: 'Casquinha crocante recheada com um incrível brigadeiro branco artesanal e pedaços de paçoca.'
    },
    {
        id: 4,
        name: 'Cone trufado de Coco',
        category: 'cone',
        img: 'img/coco.png',
        price: [8.00, 12.00],
        sizes: ['Casquinha', 'Cascão'],
        description: 'Casquinha crocante recheada com um incrível brigadeiro artesanal de coco.'
    },
    {
        id: 5,
        name: 'Cone trufado de Amendoim',
        category: 'cone',
        img: 'img/amendoim.png',
        price: [8.00, 12.00],
        sizes: ['Casquinha', 'Cascão'],
        description: 'Casquinha crocante recheada com um incrível brigadeiro branco artesanal e amendoim.'
    },
    {
        id: 6,
        name: 'Cone trufado de Maracujá',
        category: 'cone',
        img: 'img/maracuja.png',
        price: [12.00, 15.00],
        sizes: ['Casquinha', 'Cascão'],
        description: 'Casquinha crocante recheada com um incrível brigadeiro artesanal de maracujá.'
    },
    {
        id: 7,
        name: 'Cone trufado de Oreo',
        category: 'cone',
        img: 'img/oreo.png',
        price: [12.00, 15.00],
        sizes: ['Casquinha', 'Cascão'],
        description: 'Casquinha crocante recheada com um incrível brigadeiro artesanal de Oreo.'
    },
    {
        id: 8,
        name: 'Cone trufado de Sonho de Valsa',
        category: 'cone',
        img: 'img/sonho.png',
        price: [12.00, 15.00],
        sizes: ['Casquinha', 'Cascão'],
        description: 'Casquinha crocante recheada com um incrível brigadeiro artesanal e sonho de valsa.'
    },
    {
        id: 9,
        name: 'Cone trufado de Ninho com Avelã',
        category: 'cone',
        img: 'img/ninho.png',
        price: [12.00, 15.00],
        sizes: ['Casquinha', 'Cascão'],
        description: 'Casquinha crocante recheada com um incrível brigadeiro artesanal de ninho com avelã.'
    },
    {
        id: 10,
        name: 'Bolo de Pote Dois Amores',
        category: 'bolo',
        img: 'img/bolo-ninho-nutella.png',
        price: [9.00],
        sizes: ['250ml'],
        description: 'Camadas generosas de bolo fofinho intercaladas com brigadeiro cremoso branco e brigadeiro de chocolate gourmet.'
    },
    {
        id: 11,
        name: 'Bolo de Pote Chocolate',
        category: 'bolo',
        img: 'img/bolo-brigadeiro.png',
        price: [8.50],
        sizes: ['250ml'],
        description: 'Bolo de cacau artesanal molhadinho com camadas fartas de brigadeiro cremoso e confeitos nobres.'
    },
    {
        id: 12,
        name: 'Bolo de Pote Sensação',
        category: 'bolo',
        img: 'img/bolo-morango.png',
        price: [9.00],
        sizes: ['250ml'],
        description: 'Clássico favorito: bolo de chocolate macio, brigadeiro branco aveludado, chocolate e morangos selecionados.'
    },
    {
        id: 13,
        name: 'Bolo de Pote Limão / Laranja',
        category: 'bolo',
        img: 'img/bolo-limao.png',
        price: [7.50],
        sizes: ['250ml'],
        description: 'Bolo leve e suave combinado com uma refrescante mousse cítrica artesanal e raspas aromáticas.'
    },
    {
        id: 14,
        name: 'Bolo de Pote Cenoura com Chocolate',
        category: 'bolo',
        img: 'img/bolo-cenoura.png',
        price: [8.50],
        sizes: ['250ml'],
        description: 'O querido bolo de cenoura tradicional fofinho e molhadinho, coberto com camadas generosas de brigadeiro artesanal.'
    },
    {
        id: 15,
        name: 'Docinhos Temáticos Personalizados',
        category: 'docinho',
        customOrder: true,
        priceSobConsulta: true,
        img: 'img/docinho-tematico-hellokitty.jpg',
        price: null,
        sizes: ['25 un', '50 un', '100 un'],
        description: 'Docinhos gourmet decorados e modelados artesanalmente com temas e personagens (ex: Hello Kitty, temas infantis e datas comemorativas). Feito somente sob encomenda. Valores informados via mensagem.'
    },
    {
        id: 16,
        name: 'Docinhos Finos (Flores & Iniciais)',
        category: 'docinho',
        customOrder: true,
        priceSobConsulta: true,
        img: 'img/docinho-personalizado-flores-letras.jpg',
        price: null,
        sizes: ['50 un', '100 un'],
        description: 'Elegância para casamentos, 15 anos e formaturas. Docinhos personalizados com carimbo dourado da sua inicial e mini flores nobres com pérolas comestíveis. Feito somente sob encomenda. Valores informados via mensagem.'
    },
    {
        id: 17,
        name: 'Cento de Docinhos Gourmet Sortidos',
        category: 'docinho',
        customOrder: true,
        priceSobConsulta: true,
        img: 'img/docinho-cento-sortido.jpg',
        price: null,
        sizes: ['50 un (Meio Cento)', '100 un (Cento)'],
        description: 'Caixa de festa com nosso mix gourmet variado: Ninho com Nutella, Churros, Bicho de Pé, Brigadeiro Belga, Beijinho artesanal e Oreo. Feito somente sob encomenda. Valores informados via mensagem.'
    },
    {
        id: 18,
        name: 'Brigadeiro Gourmet Ninho com Nutella',
        category: 'docinho',
        customOrder: true,
        priceSobConsulta: true,
        img: 'img/docinho-ninho-nutella.jpg',
        price: null,
        sizes: ['25 un', '50 un', '100 un'],
        description: 'O sabor mais desejado: brigadeiro aveludado de puro Leite Ninho coroado com uma farta roseta de Nutella cremosa original. Feito somente sob encomenda. Valores informados via mensagem.'
    },
    {
        id: 19,
        name: 'Brigadeiro Crocante com Castanhas',
        category: 'docinho',
        customOrder: true,
        priceSobConsulta: true,
        img: 'img/docinho-crocante-castanha.jpg',
        price: null,
        sizes: ['25 un', '50 un', '100 un'],
        description: 'Brigadeiro gourmet com cobertura crocante de castanhas selecionadas e delicada roseta de ganache de chocolate nobre. Feito somente sob encomenda. Valores informados via mensagem.'
    },
    {
        id: 20,
        name: 'Brigadeiro Gourmet de Churros',
        category: 'docinho',
        customOrder: true,
        priceSobConsulta: true,
        img: 'img/docinho-churros.jpg',
        price: null,
        sizes: ['25 un', '50 un', '100 un'],
        description: 'Massa macia aromática com toque suave de canela, envolvida em açúcar fininho e bico de doce de leite artesanal premium. Feito somente sob encomenda. Valores informados via mensagem.'
    },
    {
        id: 21,
        name: 'Kit Lembrancinha 4 Docinhos Personalizados',
        category: 'docinho',
        customOrder: true,
        priceSobConsulta: true,
        img: 'img/docinho-kit-lembrancinha-4un.jpg',
        price: null,
        sizes: ['1 Caixa (4 un)', 'Kit 5 Caixas', 'Kit 10 Caixas'],
        description: 'Caixinha acrílica de presente com 4 docinhos gourmet artesanais carimbados. Perfeito para mimos, lembrancinhas de festas e eventos corporativos. Feito somente sob encomenda. Valores informados via mensagem.'
    }
];