import { Provider, Selection } from 'entcore-toolkit';
import { ${APPNAME} } from './${APPNAME.toLowerCase()}'

const provider: Provider<${APPNAME}> = new Provider<${APPNAME}>('${APPNAME.toLowerCase()}/list', ${APPNAME});

const load = async () => {
    const list = await provider.data();
    for(let el of list){
        await el.rights.fromBehaviours();
    }
    return list;
}

interface Folder{
    sync(): Promise<void>;
    name: string;
    list: ${APPNAME}[];
    selection: Selection<${APPNAME}>;
    delete(): Promise<void>;
}

class Trash implements Folder{
    provider: Provider<${APPNAME}>
    list: ${APPNAME}[] = [];
    selection: Selection<${APPNAME}> = new Selection(this.list);
    name = 'trash';

    async sync(force?: boolean){
        if(force){
            provider.isSynced = false;
        }
        this.list.splice(0, this.list.length);
        const list = await load();
        list.filter(e => e.trashed).forEach(e => this.list.push(e));
    }

    async delete(){
        for(let item of this.selection.selected){
            await item.delete();
        }
    }

    async restore(){
        for(let item of this.selection.selected){
            await item.restore();
        }
        await Library.instance.trash.sync(true);
        await Library.instance.root.sync(true);
    }
}

class Root implements Folder{
    list: ${APPNAME}[] = [];
    selection: Selection<${APPNAME}> = new Selection(this.list);
    name = 'root';

    async delete(){
        for(let item of this.selection.selected){
            await item.trash();
        }
    }

    async sync(force?: boolean){
        if(force){
            provider.isSynced = false;
        }
        
        const list = await load();
        this.list.splice(0, this.list.length);
        list.filter(e => !e.trashed).forEach(e => this.list.push(e));
    }
}

export class Library{
    private static _instance: Library;

    static get instance(): Library{
        if(!this._instance){
            this._instance = new Library();
        }
        return this._instance;
    }

    trash: Trash = new Trash();
    root: Root = new Root();

    find${APPNAME}ById(id: string){
        return this.root.list.find(e => e._id === id);
    }
}