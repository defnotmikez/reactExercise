import { Marmota } from "../../Models/Marmota";
import { MarmotaMicroservice } from "../../../routes";
import { DefaultController } from "../DefaultController";


export class MarmotaController {
    private listObjectController : DefaultController<Array<Marmota>>;
    private objectController : DefaultController<Marmota>;

    constructor () {
        this.listObjectController = new DefaultController<Array<Marmota>>();
        this.objectController = new DefaultController<Marmota>();
    }

    public async getAllMarmotas() : Promise<Array<Marmota>> {
        let res = await this.listObjectController.get(MarmotaMicroservice.GetAllMarmotas);
        
        return res;
    }

    public async getMarmotaById(id : string) : Promise<Marmota>{
        let res = await this.objectController.get(MarmotaMicroservice.GetMarmotaById + `/${id}`);
        return res;
    }

    public async createMarmota(marmota: Marmota) : Promise<Marmota> {
        let res = await this.objectController.post(MarmotaMicroservice.CreateMarmota, marmota );
        console.log(res);
        return res;
    }

    public async updateMarmota(marmota: Marmota) : Promise<Marmota> {
        let res = await this.objectController.put(MarmotaMicroservice.UpdateMarmota, marmota);
        return res;
    }

    public async deleteMarmota(marmota: Marmota) : Promise<string> {
        let res = await this.objectController.delete(MarmotaMicroservice.DeleteMarmota, marmota);
        return res;
    }
}