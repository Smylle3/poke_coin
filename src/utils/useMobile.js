import useWidth from "./useWith"

export const useMobile = () => {
  const screenWidth = useWidth()
  return screenWidth < 768
}

export default useMobile
