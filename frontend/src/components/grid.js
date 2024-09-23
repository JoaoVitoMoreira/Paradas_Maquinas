import React from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash, FaEdit} from "react-icons/fa"
import { toast } from "react-toastify";

const Table = styled.table`
    width: 100%;
    background-color: #FFF;
    padding: 20px;
    box-shadow: 0px 0px 5px #CCC;
    border-radius: 5px;
    max-width: 800px;
    margin: 20px auto;
    word-break: break-all;
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr``;

export const Th = styled.th`
    text-align: start;
    border-bottom: inset;
    padding-bottom: 5px;

    @media(max-width: 500px) {
        ${(props) => props.onlyWeb && "display: none"}
    }
`;

export const Td = styled.td`
    padding-top: 15px;
    text-align: ${(props) => (props.alignCenter ? "center" : "start")};
    width: ${(props) => (props.width ? props.width : "auto")};

    @media(max-width: 500px) {
        ${(props) => props.onlyWeb && "display: none"}
    }
`;

const Grid = ({ users, getUsers, setOnEdit }) => {

    const handleDelete = async (id) => {
        try {
            const { data } = await axios.delete(`http://localhost:4000/usuarios/${id}`);
            toast.success(data.message); // Supondo que o backend retorna uma mensagem

            await getUsers(); // Chama getUsers para atualizar a lista de usuários
        } catch (err) {
            toast.error(err.response ? err.response.data : "Erro ao deletar usuário");
        } finally {
            setOnEdit(null); // Limpa a edição
        }
    };
    
    const handleEdit = (item) => {
        setOnEdit(item);
    };
    
    return (
        <Table>
            <Thead>
                <Tr>
                    <Th>Nome</Th>
                    <Th>Senha</Th>
                    <Th>Cargo</Th>
                    <Th></Th>
                    <Th></Th>
                </Tr>
            </Thead>
            <Tbody>
                {Array.isArray(users) && users.length > 0 ? (
                users.map((item, i) => (
                <Tr key={i}>
                    <Td width="30%">{item.nome_usua}</Td>
                    <Td width="30%">{item.senha_usua}</Td>
                    <Td width="20%">{item.func_usua}</Td>
                    <Td className="text-align:center" width="5%">
                        <FaEdit onClick={() => handleEdit(item)}/>
                    </Td>
                    <Td className="text-align:center" width="5%">
                        <FaTrash onClick={() => handleDelete(item.id_usua)}/>
                    </Td>
                </Tr>
        ))
    ) : (
        <Tr>
            <Td colSpan="5">Nenhum usuário encontrado</Td>
        </Tr>
    )}
            </Tbody>
        </Table>
    );
};

export default Grid;