import { IHttp, IModify, IPersistence, IRead } from "@rocket.chat/apps-engine/definition/accessors";
import { App } from "@rocket.chat/apps-engine/definition/App";
import { ISlashCommand, SlashCommandContext } from "@rocket.chat/apps-engine/definition/slashcommands";

export class closecommand implements ISlashCommand {
    public command: string;
    public i18nParamsExample: string;
    public i18nDescription: string;
    public providesPreview: boolean;

    constructor(private readonly app: App) {
        this.command = 'close';
        this.i18nParamsExample = 'close-command-example';
        this.i18nDescription = 'close-command-description';
        this.providesPreview = false;
    };

    public async executor(context: SlashCommandContext, read: IRead, modify: IModify, http: IHttp, persis: IPersistence): Promise<void> {
        const message = modify.getCreator().startMessage();
        const rup = modify.getUpdater().getLivechatUpdater();
        const room = context.getRoom();
        const args = context.getArguments();
        await rup.closeRoom(room, args[0]||'');
    }
}

