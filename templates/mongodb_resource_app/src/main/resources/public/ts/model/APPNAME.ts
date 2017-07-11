import { notify, Rights, cleanJSON, moment } from 'entcore';
import { Mix, Selectable } from 'entcore-toolkit';
import http from 'axios';
import { Shareable } from 'entcore'

export class ${APPNAME} implements Selectable, Shareable{
    selected: boolean;
    rights = new Rights<${APPNAME}>(this);
    title: string;
    thumbnail: string;
    _id: string;
    trashed: boolean;
    content: string;
    modified: { \$date: string }

    get modifiedOn(): string{
        return moment(this.modified.\$date).format('DD/MM/YYYY');
    }

    get shortenedTitle(): string{
        if(this.title.length < 20){
            return this.title;
        }
        return this.title.substring(0, 17) + '...';
    }

    get myRights() {
        return this.rights.myRights;
    }

    async sync(){
        const response = await http.get('/${APPNAME.toLowerCase()}/' + this._id);
        Mix.extend(this, response.data);
    }

    async delete(){
        await http.delete('/${APPNAME.toLowerCase()}/' + this._id);
        notify.info('${APPNAME.toLowerCase()}.notify.deleted')
    }

    async trash(){
        await http.put('/${APPNAME.toLowerCase()}/' + this._id + '/trash');
        notify.info('${APPNAME.toLowerCase()}.notify.trashed')
    }

    async restore(){
        await http.put('/${APPNAME.toLowerCase()}/' + this._id + '/recover');
        notify.info('${APPNAME.toLowerCase()}.notify.restored')
    }

    async create(){
        this.defaultContent();
        await http.post('/${APPNAME.toLowerCase()}', this);
        notify.info('${APPNAME.toLowerCase()}.notify.saved');
    }

    async saveModifications(){
        await http.put('/${APPNAME.toLowerCase()}/' + this._id, cleanJSON(this));
    }

    async save(){
        if(this._id){
            await this.saveModifications();
        }
        else{
            await this.create();
        }
    }

    toJSON(){
        return {
            title: this.title,
            thumbnail: this.thumbnail,
            content: this.content
        };
    }

    defaultContent(){
        this.content = '<div><h1>Some content</h1><div>Here is some content to get started.</div></div>'
    }
}