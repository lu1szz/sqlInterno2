import { View, Button, StyleSheet, TextInput, Alert, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { usarBD } from './hooks/usarbd';
import { Produto } from './components/produto';

export function Index() {
    const produtosBD = usarBD();
    const [id, setId] = useState('');
    const [nome, setNome] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [pesquisa, setPesquisa] = useState('');
    const [produtos, setProdutos] = useState([]);
    const [selectedProdutoId, setSelectedProdutoId] = useState(null); // Estado para armazenar o ID do item selecionado

    async function create() {
        if (isNaN(quantidade)) {
            return Alert.alert('Quantidade', 'A quantidade precisa ser um número!');
        }
        try {
            if (selectedProdutoId) {
                // Atualizar produto existente
                await produtosBD.update({
                    id: selectedProdutoId,
                    nome,
                    quantidade: Number(quantidade),
                });
                Alert.alert('Produto atualizado!');
            } else {
                // Criar novo produto
                const item = await produtosBD.create({
                    nome,
                    quantidade: Number(quantidade),
                });
                Alert.alert('Produto cadastrado com o ID: ' + item.idProduto);
                setId(item.idProduto);
            }
            listar();
            limparCampos(); // Limpar os campos após salvar
        } catch (error) {
            console.log(error);
        }
    }

    async function listar() {
        try {
            const captura = await produtosBD.read(pesquisa);
            setProdutos(captura);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        listar();
    }, [pesquisa]);

    const remove = async (id) => {
        try {
            await produtosBD.remove(id);
            await listar();
        } catch (error) {
            console.log(error);
        }
    };

    const handleSelectProduto = (produto) => {
        setSelectedProdutoId(produto.id); // Define o ID do item selecionado
        setNome(produto.nome); // Preenche o campo "nome"
        setQuantidade(String(produto.quantidade)); // Preenche o campo "quantidade"
    };

    const limparCampos = () => {
        setNome('');
        setQuantidade('');
        setSelectedProdutoId(null);
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.texto}
                placeholder="Nome"
                onChangeText={setNome}
                value={nome}
            />
            <TextInput
                style={styles.texto}
                placeholder="Quantidade"
                onChangeText={setQuantidade}
                value={quantidade}
            />
            <Button title="Salvar" onPress={create} />
            <TextInput
                style={styles.texto}
                placeholder="Pesquisar"
                onChangeText={setPesquisa}
            />
            
            <FlatList
                contentContainerStyle={styles.listContent}
                data={produtos}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => (
                    <Produto
                        data={item}
                        
                        onDelete={() => remove(item.id)}
                        onSelect={() => handleSelectProduto(item)} // Chama handleSelectProduto ao selecionar
                        isSelected={item.id === selectedProdutoId} // Define se o item está selecionado
                    />
                    
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 32,
        gap: 16,
    },
    texto: {
        height: 54,
        borderWidth: 1,
        borderRadius: 7,
        borderColor: "#999",
        paddingHorizontal: 16,
    },
    listContent: {
        gap: 16,
    },
});
