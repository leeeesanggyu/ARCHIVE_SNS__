import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { getConnection } from "typeorm";

import { Account } from '../Models/Entities/Account';
import { AccountRepo } from '../Models/Repositories/AccountRepo';
import { AccountDTO } from '../Models/DTOs/AccountDTO';

@Service()
export class AuthService {

	private conn = getConnection();

	@InjectRepository(Account) 
	private account_repo: AccountRepo = this.conn.getRepository(Account);

	/**
	 * Verify that the data passed to DTO and the data which exist in 
	 * the Database are correct
	 * 
	 * @param account_dto : Login Account DTO
	 * 
	 * @returns Account Data ( fail : undefined ) 
	 */
	public async ValidateAccount(
		account_dto: AccountDTO 
	): Promise<Account> 
	{
		const account = await this.account_repo.findOne({
			select: ["email", "password", "name"],
			where: { email: account_dto.email }
		});

		if ( account ) {
			const is_pw_match = 
				await account.check_password (account_dto.password);

			if (is_pw_match) 
				return account;
		}

		return undefined;
	}

	/**
	 * Check that Refresh Token is Verify Token
	 * 
	 * @param account_pk : Account's PK
	 * @param refresh_token : Account's Refresh Token
	 */
	public async ValidateRefreshToken (
		account_pk : string,
		refresh_token : string
	) {
		const result = await this.account_repo.findOne({
			select: ["pk", "email", "name"],
			where: {
				pk: account_pk,
				refresh_toke: refresh_token,
			}
		});
		
		return result ? result : undefined;
	}

	public async SaveRefreshTokenDirectly(
		account : Account,
		refresh_token : string
	) {
		account.refresh_token = refresh_token;
		await this.account_repo.save(account);
	}

	public async SaveRefreshToken(
		account_pk : string,
		refresh_token : string,
	) : Promise<boolean> {
		const account = await this.account_repo.findOne({where: {pk: account_pk}});

		if(account) {
			account.refresh_token = refresh_token;
			await this.account_repo.save(account);
			
			return true;
		}
		
		return false;
	}

}