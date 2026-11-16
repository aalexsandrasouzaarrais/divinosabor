// ==========================================
// VARIÁVEIS GLOBAIS
// ==========================================
let modalKey = 0;
let quantCones = 1;
let cart = [];

const CORES_CARD = [
    '#FCE8E6', // Rosa Suave
    '#FFF0DF', // Creme Baunilha
    '#FAD4D8', // Rosa Bebê Doce
    '#E8F2E6', // Pistache Suave
    '#EBDC9B', // Amarelo Manteiga
    '#FFEAE0'  // Pêssego Delicado
];

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
    coneItem.setAttribute('data-category', item.category || 'cone');
    
    const corFundo = CORES_CARD[index % CORES_CARD.length];
    coneItem.setAttribute('data-bg', corFundo);

    let imgBlock = coneItem.querySelector('.cone-item-img, .cone-item--img');
    if (imgBlock) {
        imgBlock.style.backgroundColor = corFundo;
        
        let existingBadge = imgBlock.querySelector('.badge-encomenda');
        if (existingBadge) existingBadge.remove();

        if (item.category === 'docinho' || item.customOrder) {
            let badge = document.createElement('span');
            badge.classList.add('badge-encomenda');
            badge.innerHTML = 'Sob Encomenda';
            imgBlock.appendChild(badge);
        }
    }

    let imgElement = coneItem.querySelector('.cone-item-img img');
    if (imgElement) imgElement.src = item.img;

    let priceElement = coneItem.querySelector('.cone-item-price');
    if (item.category === 'docinho' || item.priceSobConsulta || !item.price) {
        if (priceElement) priceElement.innerHTML = '<span class="price-sob-consulta">Preço sob consulta</span>';
    } else {
        let precoExibicao = Array.isArray(item.price) ? item.price[0] : item.price;
        if (priceElement) priceElement.innerHTML = formatoReal(precoExibicao);
    }

    let nameElement = coneItem.querySelector('.cone-item-name');
    if (nameElement) nameElement.innerHTML = item.name;

    let descElement = coneItem.querySelector('.cone-item-desc');
    if (descElement) descElement.innerHTML = item.description;

    let btnAdd = coneItem.querySelector('.cone-item-add');
    if (btnAdd) {
        btnAdd.innerHTML = (item.category === 'docinho' || item.customOrder) ? 'Encomendar' : 'Quero este!';
    }
};

const preencheDadosModal = (item) => {
    let modalArea = seleciona('.coneWindowArea');
    if (modalArea) modalArea.setAttribute('data-category', item.category || 'cone');

    let bigImg = seleciona('.coneBig img');
    if (bigImg) bigImg.src = item.img;

    let coneBig = seleciona('.coneBig');
    if (coneBig) {
        let selectedCard = document.querySelector(`.cone-item[data-key="${modalKey}"]`);
        let bg = selectedCard ? selectedCard.getAttribute('data-bg') : null;
        coneBig.style.backgroundColor = bg || '#FAF6F0';
    }

    let title = seleciona('.coneInfo h1');
    if (title) title.innerHTML = item.name;

    let desc = seleciona('.coneInfo-desc');
    if (desc) desc.innerHTML = item.description;

    let actualPrice = seleciona('.coneInfo-actualPrice');
    if (item.category === 'docinho' || item.priceSobConsulta || !item.price) {
        if (actualPrice) actualPrice.innerHTML = '<span class="price-sob-consulta-modal">Sob consulta</span>';
    } else {
        let precoExibicao = Array.isArray(item.price) ? item.price[0] : item.price;
        if (actualPrice) actualPrice.innerHTML = formatoReal(precoExibicao);
    }

    // Ajusta o título do setor de tamanho para encomendas
    let sectorTitle = seleciona('.cone-option-group .coneInfo-sector');
    if (sectorTitle) {
        sectorTitle.innerHTML = (item.category === 'docinho' || item.customOrder) ? 'Quantidade / Porção' : 'Tamanho';
    }

    // Controle do aviso e campo de personalização
    let customNotice = seleciona('.custom-order-notice');
    let customInput = seleciona('#custom-order-notes');
    if (customInput) customInput.value = '';

    if (customNotice) {
        if (item.category === 'docinho' || item.customOrder) {
            customNotice.style.display = 'block';
        } else {
            customNotice.style.display = 'none';
        }
    }

    let btnAddModal = seleciona('.coneInfo-addButton span');
    if (btnAddModal) {
        btnAddModal.innerHTML = (item.category === 'docinho' || item.customOrder) ? 'Adicionar Encomenda' : 'Adicionar ao Carrinho';
    }
};

const pegarKey = (e) => {
    let key = e.target.closest('.cone-item').getAttribute('data-key');
    quantCones = 1;
    modalKey = key;
    return key;
};

const preencherTamanhos = (key) => {
    let sizesArea = seleciona('.coneInfo-sizes');
    if (!sizesArea) return;

    sizesArea.innerHTML = '';
    const item = coneJson[key];
    if (!item.sizes) return;

    item.sizes.forEach((sizeName, sizeIndex) => {
        let sizeDiv = document.createElement('div');
        sizeDiv.classList.add('coneInfo-size');
        sizeDiv.setAttribute('data-key', sizeIndex);
        if (sizeIndex === 0) {
            sizeDiv.classList.add('selected');
        }
        let span = document.createElement('span');
        span.textContent = sizeName;
        sizeDiv.appendChild(span);

        sizesArea.appendChild(sizeDiv);
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
            if (coneJson[key].category === 'docinho' || coneJson[key].priceSobConsulta || !coneJson[key].price) {
                if (actualPrice) actualPrice.innerHTML = '<span class="price-sob-consulta-modal">Sob consulta</span>';
            } else {
                let preco = Array.isArray(coneJson[key].price) ? coneJson[key].price[sizeIndex] : coneJson[key].price;
                if (actualPrice) actualPrice.innerHTML = formatoReal(preco);
            }
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

            let currentItem = coneJson[modalKey];
            let isSobConsulta = !!(currentItem.category === 'docinho' || currentItem.priceSobConsulta || !currentItem.price);
            let sizeName = currentItem.sizes ? currentItem.sizes[sizeIndex] : 'Padrão';
            let price = isSobConsulta ? 0 : (Array.isArray(currentItem.price) ? currentItem.price[sizeIndex] : currentItem.price);

            let customNotes = '';
            let customInput = seleciona('#custom-order-notes');
            if (customInput && customInput.value.trim() && (currentItem.category === 'docinho' || currentItem.customOrder)) {
                customNotes = customInput.value.trim();
            }

            let identificador = currentItem.id + 't' + sizeIndex + (customNotes ? 'c' + customNotes.replace(/[^a-zA-Z0-9]/g, '_') : '');

            let key = cart.findIndex((item) => item.identificador == identificador);

            if (key > -1) {
                cart[key].qt += quantCones;
            } else {
                let cone = {
                    identificador,
                    id: currentItem.id,
                    size: sizeName,
                    qt: quantCones,
                    price: price,
                    isSobConsulta: isSobConsulta,
                    customNotes: customNotes,
                    isEncomenda: !!(currentItem.category === 'docinho' || currentItem.customOrder)
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
        let hasSobConsulta = false;

        for (let i in cart) {
            let coneItem = coneJson.find((item) => item.id == cart[i].id);
            if (cart[i].isSobConsulta) {
                hasSobConsulta = true;
            } else {
                subtotal += cart[i].price * cart[i].qt;
            }

            let modelElement = seleciona('.models .cart-item');
            let cartItem = modelElement.cloneNode(true);

            let coneNameHtml = `<strong>${coneItem.name}</strong> <span style="color:#6A3521;">(${cart[i].size})</span>`;
            if (cart[i].isSobConsulta) {
                coneNameHtml += `<br><span style="font-size: 0.8rem; color: #8A5237; font-weight: 600;">Preço: Sob consulta via mensagem</span>`;
            }
            if (cart[i].customNotes) {
                coneNameHtml += `<br><span style="font-size: 0.78rem; color: #8A5237; font-weight: 500;">Obs: ${cart[i].customNotes}</span>`;
            }
            if (cart[i].isEncomenda) {
                coneNameHtml += `<br><span style="display:inline-block; margin-top:3px; font-size: 0.7rem; background: #FFF0DF; color: #6A3521; padding: 1px 6px; border-radius: 4px; border: 1px solid #E8D9C8;">📅 Sob Encomenda</span>`;
            }

            cartItem.querySelector('img').src = coneItem.img;
            cartItem.querySelector('.cart-item-nome').innerHTML = coneNameHtml;
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

        let totalText = formatoReal(total);
        let subtotalText = formatoReal(subtotal);

        if (hasSobConsulta && subtotal === 0) {
            subtotalText = 'Sob consulta';
            totalText = 'Sob consulta';
        } else if (hasSobConsulta && subtotal > 0) {
            subtotalText = `${formatoReal(subtotal)} + docinhos`;
            totalText = `${formatoReal(total)} + docinhos`;
        }

        if (seleciona('.subtotal span:last-child')) seleciona('.subtotal span:last-child').innerHTML = subtotalText;
        if (seleciona('.desconto span:last-child')) seleciona('.desconto span:last-child').innerHTML = formatoReal(desconto);
        if (seleciona('.total span:last-child')) seleciona('.total span:last-child').innerHTML = totalText;

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
            if (cart.length === 0) return;

            let mensagem = "Olá, Divino Sabor! Gostaria de fazer o seguinte pedido:\n\n";
            let total = 0;
            let hasSobConsulta = false;

            cart.forEach((c, idx) => {
                let prod = coneJson.find(p => p.id == c.id);
                let subt = c.price * c.qt;
                total += subt;

                mensagem += `${idx + 1}. *${prod.name}*\n`;
                mensagem += `   • Opção/Qtd: ${c.size}\n`;
                mensagem += `   • Quantidade: ${c.qt}\n`;
                if (c.isSobConsulta) {
                    hasSobConsulta = true;
                    mensagem += `   • Valor: _A combinar por mensagem_\n`;
                } else {
                    mensagem += `   • Subtotal: ${formatoReal(subt)}\n`;
                }
                if (c.customNotes) {
                    mensagem += `   • Personalização/Tema: ${c.customNotes}\n`;
                }
                if (c.isEncomenda) {
                    mensagem += `   • _[Item Feito Sob Encomenda]_\n`;
                }
                mensagem += `\n`;
            });

            if (hasSobConsulta && total === 0) {
                mensagem += `*Total: Valores dos docinhos a combinar por mensagem*\n\n`;
            } else if (hasSobConsulta) {
                mensagem += `*Total dos Itens Prontos: ${formatoReal(total)} (+ docinhos a combinar por mensagem)*\n\n`;
            } else {
                mensagem += `*Total do Pedido: ${formatoReal(total)}*\n\n`;
            }
            mensagem += `Por favor, me informe o orçamento dos docinhos sob encomenda e o prazo de entrega/retirada. Muito obrigado!`;

            let numeroWhatsapp = '5511999999999';
            let url = `https://api.whatsapp.com/send?phone=${numeroWhatsapp}&text=${encodeURIComponent(mensagem)}`;
            window.open(url, '_blank');

            alert('Seu pedido foi estruturado! Redirecionando para o WhatsApp da Divino Sabor para consultar os valores dos docinhos.');
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
// LÓGICA DA BARRA DE PESQUISA E CATEGORIAS
// ==========================================
const searchInput = document.querySelector('.search-input');
const searchButton = document.querySelector('.search-button');
let currentCategory = 'all';

function filtrarCatalogo() {
    const termoBusca = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const todosOsCards = document.querySelectorAll('.cone-area .cone-item');

    let visibleIndex = 0;
    todosOsCards.forEach(card => {
        const nome = card.querySelector('.cone-item-name')?.textContent.toLowerCase() || '';
        const descricao = card.querySelector('.cone-item-desc')?.textContent.toLowerCase() || '';
        const categoria = card.getAttribute('data-category') || 'cone';

        const matchesSearch = nome.includes(termoBusca) || descricao.includes(termoBusca);
        const matchesCategory = currentCategory === 'all' || categoria === currentCategory;

        if (matchesSearch && matchesCategory) {
            card.style.display = 'flex';
            const corFundo = CORES_CARD[visibleIndex % CORES_CARD.length];
            card.setAttribute('data-bg', corFundo);
            const imgBlock = card.querySelector('.cone-item-img, .cone-item--img');
            if (imgBlock) imgBlock.style.backgroundColor = corFundo;
            visibleIndex++;
        } else {
            card.style.display = 'none';
        }
    });
}

if (searchButton) {
    searchButton.addEventListener('click', (e) => {
        e.preventDefault();
        filtrarCatalogo();
    });
}

if (searchInput) {
    searchInput.addEventListener('input', filtrarCatalogo);
}

// Lógica de Troca de Abas de Categorias
document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCategory = btn.getAttribute('data-category');
        filtrarCatalogo();
    });
});

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