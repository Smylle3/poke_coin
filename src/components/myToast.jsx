const MyToast = (toast, title, status) => {
    toast({
        title: title,
        status: status,
        isClosable: true,
        duration: 2000,
        position: "top",
    })
}

export default MyToast
