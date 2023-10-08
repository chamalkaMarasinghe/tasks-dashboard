export const GET_TASKS = "GET_TASKS";
const GET_TASKS_END_POINT = "https://6363c8f68a3337d9a2e7d805.mockapi.io/api/to-do";

export const getTasks = () => {
    try {
        return async dispatch => {
            const req = await fetch(GET_TASKS_END_POINT, {
                method : "GET",
                headers : {"Content-Type" : "Application/json"}
            })
            const result = await req.json();
            if(result){
                dispatch({
                    type : GET_TASKS,
                    payload : result
                })
            }
        }
    } catch (error) {
        console.log(error);
    }
}