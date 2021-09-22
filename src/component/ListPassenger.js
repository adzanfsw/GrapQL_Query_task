import ListItem from './ListItem';
import { gql, useQuery, useMutation } from '@apollo/client'

const GetPenumpang = gql`
    query MyQuery {
        anggota {
            nama
            umur
            jenisKelamin
        }
      }
    `;

const hapusPengunjung = gql`
    mutation MyMutation($id: Int!) {
        delete_todolist_by_pk(id: $id)
    }
    `;

// const DeleteTodo = gql`
//     mutation MyMutation($id: Int!) {
//         delete_anggota_by_pk(id: $id) {
//             id
//         }
//     }
//     `;

const ListPassenger = (penumpang) => {
    const {data, error} = useQuery(GetPenumpang);
    const [hapusPengunjung] = useMutation(hapusPengunjung, {
        refetchQueries: [GetPenumpang]
      });

    if (error) {
        console.log(error)
        return null
    }

    return (
        <div>
            <table cellPadding="5px" cellSpacing="0" style={{margin: "auto"}}>
                <thead bgcolor="red">
                    <td>Nama</td>
                    <td>Umur</td>
                    <td>Jenis Kelamin</td>
                    <td bgcolor="white" className="removeBorder"></td>
                </thead>
                {data?.anggota.map(item => (
                    <ListItem
                        key={item.id}
                        data={item}
                        hapusPengunjung={hapusPengunjung}
                    />
                ))}
            </table>
            
        </div>
    )
  }

export default ListPassenger;