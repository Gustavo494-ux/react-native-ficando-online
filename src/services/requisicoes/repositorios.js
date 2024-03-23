import api from "../api";

export async function pegarRepositoriosDoUsuarios(id){
    try {
        const resultado = await api.get(`/repos?postId=${id}`);
        return resultado.data
    } catch (error) {
        console.log(error)
        return []
    }
}

export async function alterarRepositoriosDoUsuarios(postId,nome,data,id){
    try {
        console.log(`dados da requisição postId:${postId}, nome:${nome}, data:${data}, id:${id}`)
        await api.put(`/repos/${id}`,{
            name: nome,
            data: data,
            postId: postId,
            id: id
        });

        return 'sucesso'
    } catch (error) {
        console.log(error)
        return 'erro'
    }
}