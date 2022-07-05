
export const fetchUserMeetings = () => {
  return fetch("http:localhost:8080/data")
  .then(resp => resp.json())
}