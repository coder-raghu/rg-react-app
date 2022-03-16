const UserDetails = (data) => {
    const {id,name,email,phone} = data.data;
    return (
        <>
            <tr key={id}>
                <td>{name}</td>
                <td>{email}</td>
                <td>{phone}</td>
            </tr>
        </>
    );

}

export default UserDetails;