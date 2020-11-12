import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';


interface Request {
  title: string;
  value: number,
  type: "income" | "outcome"
}
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({title,value,type}: Request ): Transaction {

      if(!['outcome','income'].includes(type)){
        throw new Error("invalid type")
      }
      const { total} =  this.transactionsRepository.getBalance();


      if(type == "outcome" && value > total){
        throw new Error('You dont have enough balance');
      }
    
    const transaction = this.transactionsRepository.create({title,type,value});
    
    return transaction;
  }
}

export default CreateTransactionService;
