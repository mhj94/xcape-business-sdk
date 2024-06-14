const storageArr = [];
const hintArr = [];
const tagArr = [];
const viewArr = [];

const mapCodeToId = (merchantCode, themeCode) => {
    let merchantId = null;
    let themeId = null;

    if (merchantCode === 'mrc001') {
        merchantId = 1;
        if (themeCode === 'thm001') {
            themeId = 2;
        } else if (themeCode === 'thm002') {
            themeId = 3;
        } else if (themeCode === 'thm003') {
            themeId = 1;
        }
    } else if (merchantCode === 'mrc002') {
        merchantId = 2;
        if (themeCode === 'thm001') {
            themeId = 7;
        } else if (themeCode === 'thm003') {
            themeId = 6;
        } else if (themeCode === 'thm004') {
            themeId = 9;
        } else if (themeCode === 'thm007') {
            themeId = 23;
        }
    } else if (merchantCode === 'mrc003') {
        merchantId = 3;
        if (themeCode === 'thm001') {
            themeId = 19;
        } else if (themeCode === 'thm002') {
            themeId = 22;
        } else if (themeCode === 'thm003') {
            themeId = 18;
        }
    } else if (merchantCode === 'mrc004') {
        merchantId = 4;
        if (themeCode === 'thm001') {
            themeId = 14;
        } else if (themeCode === 'thm002') {
            themeId = 16;
        } else if (themeCode === 'thm003') {
            themeId = 17;
        } else if (themeCode === 'thm004') {
            themeId = 13;
        } else if (themeCode === 'thm005') {
            themeId = 15;
        } else if (themeCode === 'thm006') {
            themeId = 12;
        } else if (themeCode === 'thm007') {
            themeId = 24;
        }
    }

    return {merchantId, themeId}
}

const migrateStorage = () => {
    axios.get('https://firebasestorage.googleapis.com/v0/b/xcape-hint-app.appspot.com/o')
        .then((res) => {
            const {items} = res.data;
            items.forEach(({name}) => {
                const split = name.split('/');

                const {merchantId, themeId} = mapCodeToId(split[0], split[1])
                const url = `https://firebasestorage.googleapis.com/v0/b/xcape-hint-app.appspot.com/o/${encodeURIComponent(name)}?alt=media`;

                let fileType = '';

                if (split[2] === 'ImageView' || split[2] === 'ImegeView') {
                    fileType = 'IMAGE';
                } else if (split[2] === 'AudioView') {
                    fileType = 'AUDIO';
                } else if (split[2] === 'VideoView') {
                    fileType = 'VIDEO'
                }

                const object = {
                    merchantId,
                    themeId,
                    fileType,
                    filename: split[3],
                    url
                }

                storageArr.push(object);
            });
        });
}

const migrateHint = () => {
    firebase.database().ref(`/hintCode`).on('value', (snapshot) => {
        const res = snapshot.val();
        const merchantList = Object.keys(res);
        merchantList.forEach(merchantCode => {
            const themeList = Object.keys(res[merchantCode])
            themeList.forEach(themeCode => {
                const object = mapCodeToId(merchantCode, themeCode);
                const hintObject = Object.values(res[merchantCode][themeCode]);

                hintObject.forEach(({key, createTime, message1, message2, use}) => {
                    if (createTime) {
                        const createdAt = new Date(parseInt(createTime.value._seconds.toString() + '890'))

                        const newObject = {
                            ...object,
                            createdAt,
                            code: key,
                            message1,
                            message2,
                            isUsed: use
                        }
                        hintArr.push(newObject)
                    }
                });
            });
        });
        // console.log(hintArr);
    });
}

// update
// view v
// SET (
// tag_id = select
// tag_id
// from tag t
// where t.reference_code = v.reference_code
// LIMIT 1
// )
//
// update view v
// set(target_tag_id = select
// tag_id
// from tag t
// where t.reference_code = v.reference_code
// )
// where v.type = 'ANSWER'


const migrateTag = () => {
    firebase.database().ref(`/tagView`).on('value', (snapshot) => {
        const res = snapshot.val();
        const merchantList = Object.keys(res);
        merchantList.forEach(merchantCode => {
            const themeList = Object.keys(res[merchantCode])
            themeList.forEach(themeCode => {
                const {merchantId, themeId} = mapCodeToId(merchantCode, themeCode);
                const pageList = Object.keys(res[merchantCode][themeCode]);

                pageList.forEach((page) => {
                    tagArr.push({merchantId, themeId, tagName:page, referenceCode: `/${merchantCode}/${themeCode}/${page}`})
                });
            });
        });
        // console.log(tagArr);
    });
}

const migrateView = () => {
    firebase.database().ref(`/tagView`).on('value', (snapshot) => {
        const res = snapshot.val();
        const merchantList = Object.keys(res);
        merchantList.forEach(merchantCode => {
            const themeList = Object.keys(res[merchantCode])
            themeList.forEach(themeCode => {
                const {merchantId, themeId} = mapCodeToId(merchantCode, themeCode);
                const pageList = Object.keys(res[merchantCode][themeCode]);

                pageList.forEach((page) => {
                    const component = res[merchantCode][themeCode][page];
                    const componentList = component.components;
                    if (Array.isArray(componentList)) {
                        componentList.forEach((a, index) => {
                            let type = '';
                            if (a.component === "ImageView") {
                                type = 'IMAGE';
                            } else if (a.component === 'VideoView') {
                                type = 'VIDEO';
                            }else if (a.component === 'AudioView') {
                                type = 'AUDIO';
                            }else if (a.component === 'CameraView') {
                                type = 'CAMERA';
                            }else if (a.component === 'PasswordTagView') {
                                type = 'ANSWER';
                            }

                            let filename = null;

                            if (a.url) {
                                filename = decodeURIComponent(new URL(a.url).pathname.split('/').pop()).split('/').pop();
                            }

                            let moveToPage = null;
                            if (a.moveToPage) {
                                moveToPage = `/${a.moveToPage}`;
                            }
                            viewArr.push({merchantId, themeId, ...a, filename, moveToPage, type, referenceCode: `/${merchantCode}/${themeCode}/${page}`, orders: index})
                        });
                    }
                });
            });
        });
        // console.log(viewArr);
    });
}

// migrateHint();
migrateStorage();
migrateTag();
migrateView();

