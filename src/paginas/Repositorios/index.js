    import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, TouchableOpacity, TextInput } from 'react-native';
import estilos from './estilos';
import { buscarRepositoriosPeloNome, pegarRepositoriosDoUsuarios } from '../../services/requisicoes/repositorios';
import { useIsFocused } from '@react-navigation/native';

export default function Repositorios({ route, navigation }) {
    const [repo, setRepo] = useState([]);
    const estaNaTela = useIsFocused();
    const [nomeRepo, setNomeRepo] = useState('');

    async function buscarRepositoriosPorNome (){
        const resultado = await buscarRepositoriosPeloNome(nomeRepo);
        setRepo(resultado);
    }

    async function buscarRepositoriosDoUsuario(){
        const resultado = await pegarRepositoriosDoUsuarios(route.params.id);
        setRepo(resultado);
    }


    useEffect(() => {        
        buscarRepositoriosDoUsuario();
    },[estaNaTela]);


    useEffect(() => {
        if (nomeRepo.trim() == '' ){
            buscarRepositoriosDoUsuario();
        } else {
            buscarRepositoriosPorNome()
        }
    },[nomeRepo]);

    return (
        <View style={estilos.container}>
            <TextInput 
                value={nomeRepo}
                onChangeText={setNomeRepo}
                placeholder='Busque por um repositorio'
                autoCapitalize='none'
                style={estilos.entrada}
                />


            <Text style={estilos.repositoriosTexto}>{repo.length} repositórios criados</Text>
            <TouchableOpacity 
                style={estilos.botao}
                onPress={() => navigation.navigate('CriarRepositorio',{id: route.params.id})}
            >
            <Text style={estilos.textoBotao}>Adicionar novo repositório</Text>
                </TouchableOpacity>
                <FlatList 
                    data={repo}
                    style={{width: '100%'}}
                    keyExtractor={repo => repo.id}
                    renderItem={({item}) =>(
                        <TouchableOpacity 
                            style={estilos.repositorio}
                            onPress={() => navigation.navigate('InfoRepositorio',{item})}
                        >
                            <Text style={estilos.repositorioNome}>{item.name}</Text>
                            <Text style={estilos.repositorioData}>{item.data}</Text>
                        </TouchableOpacity>
                    )}
                />
        </View>
    );
}
