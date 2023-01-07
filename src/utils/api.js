// import axios from "axios";

// export const BASE_URL = 'https://cerulean-marlin-wig.cyclic.app';
export const BASE_URL = 'https://charming-bat-singlet.cyclic.app/https://cerulean-marlin-wig.cyclic.app';

export const getAllActivitiesUrl = `${BASE_URL}/activities`;

export const getActivityByIdUrl = (call_id) => {
    return `${BASE_URL}/activities/${call_id}`;
}

export const resetActivitiesUrl = `${BASE_URL}/reset`;
// export const getAsync = async (options) => apiAsync({ method: 'GET', ...options });
// export const patchAsync = async (options) => apiAsync({ method: 'PATCH', ...options });

// Main api function
// const apiAsync = async ({
//     url,
//     method,
//     headers = {},
//     data,
//     responseType = 'json',
// }) => {
//     const completeUrl = getCompleteUrl(url);
//     if (!headers['Accept']) {
//         headers['Accept'] = 'application/json';
//     }

//     if (!headers['Content-Type']) {
//         headers['Content-Type'] = 'application/json;charset=UTF-8';
//     }

//     console.log(completeUrl);
//     return (await axios({
//         url: completeUrl,
//         method,
//         headers,
//         responseType: responseType,
//         data
//     })).data;
// }

const getCompleteUrl = url => {
    const encodedUrl = url;
    const completeUrl = encodedUrl.indexOf('http') >= 0 ? encodedUrl : `${BASE_URL}${encodedUrl}`;
    return completeUrl;
}

// export const getAllActivities = async () => {
//     return await getAsync({
//         url: `/activities`
//     })
// }

// export const getActivityById = async ({ call_id }) => {
//     return await getAsync({
//         url: `/activities/${call_id}`
//     })
// }

// export const resetActivities = async () => {
//     return await patchAsync({
//         url: `/reset`
//     })
// }

// export const archiveActivity = async (call_id) => {
//     return await patchAsync({
//         url: `/activities/${call_id}`
//     })
// }