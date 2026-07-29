// ==========================================
// VARIÁVEIS GLOBAIS
// ==========================================
let modalKey = 0;
let quantCones = 1;
let cart = [];

// ==========================================
// FUNÇÕES AUXILIARES
// ==========================================
const seleciona = (elemento) => document.querySelector(elemento);
const selecionaTodos = (elemento) => document.querySelectorAll(elemento);

const formatoReal = (valor) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

const abrirModal = () => {
    seleciona('.coneWindowArea').style.opacity = 0;
    seleciona('.coneWindowArea').style.display = 'flex';
    setTimeout(() => seleciona('.coneWindowArea').style.opacity = 1, 150);
};

const fecharModal = () => {
    seleciona('.coneWindowArea').style.opacity = 0;
    setTimeout(() => seleciona('.coneWindowArea').style.display = 'none', 500);
};

const botoesFechar = () => {
    selecionaTodos('.coneInfo-cancelButton, .coneInfo-cancelMobileButton').forEach((item) => {
        item.addEventListener('click', fecharModal);
    });
};

const preencheDadosDosCones = (coneItem, item, index) => {
    coneItem.setAttribute('data-key', index);
    
    let imgElement = coneItem.querySelector('.cone-item-img img');
    if (imgElement) imgElement.src = item.img;

    let priceElement = coneItem.querySelector('.cone-item-price');
    let precoExibicao = Array.isArray(item.price) ? item.price[item.price.length - 1] : item.price;
    if (priceElement) priceElement.innerHTML = formatoReal(precoExibicao);

    let nameElement = coneItem.querySelector('.cone-item-name');
    if (nameElement) nameElement.innerHTML = item.name;

    let descElement = coneItem.querySelector('.cone-item-desc');
    if (descElement) descElement.innerHTML = item.description;
};

const preencheDadosModal = (item) => {
    let bigImg = seleciona('.coneBig img');
    if (bigImg) bigImg.src = item.img;

    let title = seleciona('.coneInfo h1');
    if (title) title.innerHTML = item.name;

    let desc = seleciona('.coneInfo-desc');
    if (desc) desc.innerHTML = item.description;

    let actualPrice = seleciona('.coneInfo-actualPrice');
    let precoExibicao = Array.isArray(item.price) ? item.price[item.price.length - 1] : item.price;
    if (actualPrice) actualPrice.innerHTML = formatoReal(precoExibicao);
};

const pegarKey = (e) => {
    let key = e.target.closest('.cone-item').getAttribute('data-key');
    quantCones = 1;
    modalKey = key;
    return key;
};

const preencherTamanhos = (key) => {
    let itemSelecionado = seleciona('.coneInfo-size.selected');
    if (itemSelecionado) {
        itemSelecionado.classList.remove('selected');
    }

    let tamanhos = selecionaTodos('.coneInfo-size');
    
    tamanhos.forEach((size, sizeIndex) => {
        if (coneJson[key].sizes && coneJson[key].sizes[sizeIndex]) {
            size.style.display = 'flex';
            size.querySelector('span').innerHTML = coneJson[key].sizes[sizeIndex];

            if (sizeIndex === coneJson[key].sizes.length - 1) {
                size.classList.add('selected');
            }
        } else {
            size.style.display = 'none';
        }
    });
};

const escolherTamanhoPreco = (key) => {
    let tamanhos = selecionaTodos('.coneInfo-size');

    tamanhos.forEach((size, sizeIndex) => {
        size.addEventListener('click', () => {
            let itemSelecionado = seleciona('.coneInfo-size.selected');
            if (itemSelecionado) {
                itemSelecionado.classList.remove('selected');
            }
            size.classList.add('selected');

            let actualPrice = seleciona('.coneInfo-actualPrice');
            let preco = Array.isArray(coneJson[key].price) ? coneJson[key].price[sizeIndex] : coneJson[key].price;
            
            if (actualPrice) actualPrice.innerHTML = formatoReal(preco);
        });
    });
};

const mudarQuantidade = () => {
    let btnMais = seleciona('.coneInfo-qtmais');
    let btnMenos = seleciona('.coneInfo-qtmenos');
    let qtContainer = seleciona('.coneInfo-qt');

    if (btnMais) {
        btnMais.addEventListener('click', () => {
            quantCones++;
            if (qtContainer) qtContainer.innerHTML = quantCones;
        });
    }

    if (btnMenos) {
        btnMenos.addEventListener('click', () => {
            if (quantCones > 1) {
                quantCones--;
                if (qtContainer) qtContainer.innerHTML = quantCones;
            }
        });
    }
};

// ==========================================
// CARRINHO DE COMPRAS
// ==========================================
const adicionarNoCarrinho = () => {
    let btnAdd = seleciona('.coneInfo-addButton');

    if (btnAdd) {
        btnAdd.addEventListener('click', () => {
            let tamanhos = selecionaTodos('.coneInfo-size');
            let sizeIndex = 0;

            tamanhos.forEach((element, index) => {
                if (element.classList.contains('selected')) {
                    sizeIndex = index;
                }
            });

            let sizeName = coneJson[modalKey].sizes[sizeIndex];
            let price = Array.isArray(coneJson[modalKey].price) ? coneJson[modalKey].price[sizeIndex] : coneJson[modalKey].price;
            let identificador = coneJson[modalKey].id + 't' + sizeIndex;

            let key = cart.findIndex((item) => item.identificador == identificador);

            if (key > -1) {
                cart[key].qt += quantCones;
            } else {
                let cone = {
                    identificador,
                    id: coneJson[modalKey].id,
                    size: sizeName,
                    qt: quantCones,
                    price: price
                };
                cart.push(cone);
            }

            fecharModal();
            seleciona('aside').classList.add('show');
            atualizarCarrinho();
        });
    }
};

const abrirCarrinho = () => {
    let menuOpener = seleciona('.menu-openner');
    if (menuOpener) {
        menuOpener.addEventListener('click', () => {
            seleciona('aside').classList.add('show');
        });
    }
};

const fecharCarrinho = () => {
    let menuCloser = seleciona('.menu-closer');
    if (menuCloser) {
        menuCloser.addEventListener('click', () => {
            seleciona('aside').classList.remove('show');
        });
    }
};

const atualizarCarrinho = () => {
    let openerSpan = seleciona('.menu-openner span');
    if (openerSpan) openerSpan.innerHTML = cart.length;

    seleciona('.cart').innerHTML = '';

    if (cart.length > 0) {
        let subtotal = 0;
        let desconto = 0;
        let total = 0;

        for (let i in cart) {
            let coneItem = coneJson.find((item) => item.id == cart[i].id);
            subtotal += cart[i].price * cart[i].qt;

            let modelElement = seleciona('.models .cart-item');
            let cartItem = modelElement.cloneNode(true);

            let coneName = `${coneItem.name} (${cart[i].size})`;

            cartItem.querySelector('img').src = coneItem.img;
            cartItem.querySelector('.cart-item-nome').innerHTML = coneName;
            cartItem.querySelector('.cart-item-qt').innerHTML = cart[i].qt;

            cartItem.querySelector('.cart-item-qtmais').addEventListener('click', () => {
                cart[i].qt++;
                atualizarCarrinho();
            });

            cartItem.querySelector('.cart-item-qtmenos').addEventListener('click', () => {
                if (cart[i].qt > 1) {
                    cart[i].qt--;
                } else {
                    cart.splice(i, 1);
                }
                atualizarCarrinho();
            });

            seleciona('.cart').append(cartItem);
        }

        desconto = subtotal * 0;
        total = subtotal - desconto;

        if (seleciona('.subtotal span:last-child')) seleciona('.subtotal span:last-child').innerHTML = formatoReal(subtotal);
        if (seleciona('.desconto span:last-child')) seleciona('.desconto span:last-child').innerHTML = formatoReal(desconto);
        if (seleciona('.total span:last-child')) seleciona('.total span:last-child').innerHTML = formatoReal(total);

        let btnFinalizar = seleciona('.cart-finalizar');
        if (btnFinalizar) btnFinalizar.style.display = 'block';

    } else {
        seleciona('.cart').innerHTML = `
            <div style="text-align: center; padding: 40px 10px; color: #61524B; font-size: 0.95rem; font-weight: 500;">
                Seu carrinho está vazio 🛒
            </div>
        `;

        if (seleciona('.subtotal span:last-child')) seleciona('.subtotal span:last-child').innerHTML = formatoReal(0);
        if (seleciona('.desconto span:last-child')) seleciona('.desconto span:last-child').innerHTML = formatoReal(0);
        if (seleciona('.total span:last-child')) seleciona('.total span:last-child').innerHTML = formatoReal(0);

        let btnFinalizar = seleciona('.cart-finalizar');
        if (btnFinalizar) btnFinalizar.style.display = 'none';
    }
};

const finalizarCompra = () => {
    let btnFinalizar = seleciona('.cart-finalizar');
    if (btnFinalizar) {
        btnFinalizar.addEventListener('click', () => {
            alert('Pedido enviado com sucesso!');
            cart = [];
            atualizarCarrinho();
        });
    }
};

// ==========================================
// INICIALIZAÇÃO E MONTAGEM DOS CONES
// ==========================================
coneJson.map((item, index) => {
    let coneItem = seleciona('.models .cone-item').cloneNode(true);
    seleciona('.cone-area').append(coneItem);

    preencheDadosDosCones(coneItem, item, index);

    coneItem.querySelector('.cone-item a').addEventListener('click', (e) => {
        e.preventDefault();

        let chave = pegarKey(e);

        abrirModal();
        preencheDadosModal(item);
        preencherTamanhos(chave);

        let qtContainer = seleciona('.coneInfo-qt');
        if (qtContainer) qtContainer.innerHTML = quantCones;

        escolherTamanhoPreco(chave);
    });

    botoesFechar();
});

mudarQuantidade();
adicionarNoCarrinho();
abrirCarrinho();
fecharCarrinho();
atualizarCarrinho();
finalizarCompra();

// ==========================================
// LÓGICA DA BARRA DE PESQUISA
// ==========================================
const searchInput = document.querySelector('.search-input');
const searchButton = document.querySelector('.search-button');

function filtrarCones() {
    if (!searchInput) return;
    const termoBusca = searchInput.value.toLowerCase().trim();
    const todosOsCones = document.querySelectorAll('.cone-area .cone-item');

    todosOsCones.forEach(card => {
        const nome = card.querySelector('.cone-item-name')?.textContent.toLowerCase() || '';
        const descricao = card.querySelector('.cone-item-desc')?.textContent.toLowerCase() || '';

        if (nome.includes(termoBusca) || descricao.includes(termoBusca)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

if (searchButton) {
    searchButton.addEventListener('click', (e) => {
        e.preventDefault();
        filtrarCones();
    });
}

if (searchInput) {
    searchInput.addEventListener('input', filtrarCones);
}

// ==========================================
// FUNÇÕES DE FECHAMENTO DO MODAL
// ==========================================
function closeModal() {
    const modal = document.querySelector('.coneWindowArea');
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.display = 'none';
            modal.style.opacity = '1';
        }, 200);
    }
}

document.addEventListener('click', (e) => {
    if (e.target.closest('.cone-close-btn') || e.target.classList.contains('coneInfo-cancelButton') || e.target.classList.contains('coneInfo-cancelMobileButton')) {
        closeModal();
    }
    
    if (e.target.classList.contains('coneWindowArea')) {
        closeModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});