"use client"
import "@/components/page.css"
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { BarChart, Bar, XAxis, YAxis, Legend, Tooltip, Rectangle, ResponsiveContainer, CartesianGrid } from "recharts"

export default function Home() {
  const [form, setForm] = useState({ "type": "", "amount": "", "date": "", "description": "", "recurring": "", "category": "" })
  const [data, setData] = useState([
    {
      "id": 1,
      "type": "income",
      "amount": 5000,
      "date": "30-06-2024",
      "description": "Freelance project payment",
      "recurring": "monthly",
      "category": "Freelance"
    },
    {
      "id": 2,
      "type": "expense",
      "amount": 1200,
      "date": "15-06-2024",
      "description": "Grocery shopping",
      "recurring": "weekly",
      "category": "Groceries"
    },
    {
      "id": 3,
      "type": "income",
      "amount": 60000,
      "date": "01-06-2024",
      "description": "Monthly salary",
      "recurring": "monthly",
      "category": "Salary"
    },
    {
      "id": 4,
      "type": "expense",
      "amount": 5000,
      "date": "20-06-2024",
      "description": "Restaurant dining",
      "recurring": "one-time",
      "category": "Entertainment"
    },
    {
      "id": 5,
      "type": "income",
      "amount": 3000,
      "date": "25-06-2024",
      "description": "Dividends",
      "recurring": "yearly",
      "category": "Investments"
    },
    {
      "id": 6,
      "type": "expense",
      "amount": 2500,
      "date": "05-06-2024",
      "description": "Internet bill",
      "recurring": "monthly",
      "category": "Utilities"
    },
    {
      "id": 7,
      "type": "expense",
      "amount": 15000,
      "date": "10-06-2024",
      "description": "New phone purchase",
      "recurring": "one-time",
      "category": "Gadgets"
    },
    {
      "id": 8,
      "type": "income",
      "amount": 2000,
      "date": "28-06-2024",
      "description": "Selling old furniture",
      "recurring": "one-time",
      "category": "Miscellaneous"
    },
    {
      "id": 9,
      "type": "expense",
      "amount": 300,
      "date": "18-06-2024",
      "description": "Coffee with friends",
      "recurring": "one-time",
      "category": "Entertainment"
    },
    {
      "id": 10,
      "type": "income",
      "amount": 10000,
      "date": "03-06-2024",
      "description": "Stock market gains",
      "recurring": "yearly",
      "category": "Investments"
    },
    {
      "id": 11,
      "type": "income",
      "amount": 2000,
      "date": "12-06-2024",
      "description": "Gift from family",
      "recurring": "one-time",
      "category": "Gifts"
    },
    {
      "id": 12,
      "type": "expense",
      "amount": 6000,
      "date": "16-06-2024",
      "description": "Weekend trip",
      "recurring": "one-time",
      "category": "Travel"
    },
    {
      "id": 13,
      "type": "income",
      "amount": 3500,
      "date": "27-06-2024",
      "description": "Tutoring",
      "recurring": "weekly",
      "category": "Freelance"
    },
    {
      "id": 14,
      "type": "expense",
      "amount": 1000,
      "date": "13-06-2024",
      "description": "Electricity bill",
      "recurring": "monthly",
      "category": "Utilities"
    },
    {
      "id": 15,
      "type": "income",
      "amount": 7000,
      "date": "14-06-2024",
      "description": "Bonus",
      "recurring": "one-time",
      "category": "Salary"
    },
    {
      "id": 16,
      "type": "income",
      "amount": 4500,
      "date": "06-06-2024",
      "description": "Freelance writing",
      "recurring": "monthly",
      "category": "Freelance"
    },
    {
      "id": 17,
      "type": "expense",
      "amount": 2000,
      "date": "07-06-2024",
      "description": "Gym membership",
      "recurring": "monthly",
      "category": "Health"
    },
    {
      "id": 18,
      "type": "income",
      "amount": 500,
      "date": "29-06-2024",
      "description": "Refund from store",
      "recurring": "one-time",
      "category": "Miscellaneous"
    }
  ]  
  )
  const [formCategory, setFormCategory] = useState(["Freelance", "Groceries", "Salary", "Entertainment", "Investments", "Utilities", "Gadgets", "Miscellaneous", "Gifts", "Travel", "Health"])
  const [customCategory, setcustomCategory] = useState(false)
  const [filter, setFilter] = useState({ "filtertype": "", "filteramount1": "", "filteramount2": "", "filterdate": "", "filterdescription": "", "filterrecurring": "", "filtercategory": "" })
  const [givingnewId, setgivingnewId] = useState(true)
  const [chartdata, setchartdata] = useState([])

  useEffect(() => {
    const storedData = localStorage.getItem("storage")
    if (storedData) {
      setData(JSON.parse(storedData))
    }
    const storedCategoryData = localStorage.getItem("storageCategory")
    if (storedCategoryData) {
      setFormCategory(JSON.parse(storedCategoryData))
    }
  }, [])

  useEffect(() => {
   const newChartData=[]
    formCategory.forEach((itemCategory)=>{
    const incomeChart=data.reduce((initial, item) => initial + ((item.type == "income"&&item.category==itemCategory) ? item.amount : 0), 0)
    if(incomeChart){
    newChartData.push({"type":"income","category":itemCategory,"amount":incomeChart})}
    const expenseChart=data.reduce((initial, item) => initial + ((item.type == "expense"&&item.category==itemCategory) ? item.amount : 0), 0)
    if(expenseChart){
    newChartData.push({"type":"expense","category":itemCategory,"amount":expenseChart})}
  })
    setchartdata(newChartData)
  },[data])

  const handleChange = (e) => {
    if (e.target.name == "amount") {
      if (!isNaN(e.target.value)) {
        setForm({ ...form, [e.target.name]: Number(e.target.value) })
      }
      else {
        setForm({ ...form, [e.target.name]: "" })
      }
    }
    else { setForm({ ...form, [e.target.name]: e.target.value }) }
    if (e.target.value == "custom") {
      setcustomCategory(true)
    }
  }

  const handleChangeFilter = (e) => {
    if ((e.target.name == "filteramount1") || (e.target.name == "filteramount2")) {
      if (!isNaN(e.target.value)) {
        setFilter({ ...filter, [e.target.name]: Number(e.target.value) })
      }
      else {
        setFilter({ ...filter, [e.target.name]: "" })
      }
    }
    else { setFilter({ ...filter, [e.target.name]: e.target.value }) }
  }

  const handleAdd = () => {
    if (givingnewId == true) {
      setData([...data, { ...form, id: uuidv4() }])
    }
    else {
      setData([...data, form])
      setgivingnewId(true)
    }
    localStorage.setItem("storage", JSON.stringify([...data, { ...form, id: uuidv4() }]))
    setcustomCategory(false)
    if (form.category != "" && !formCategory.includes(form.category)) {
      setFormCategory([...formCategory, form.category])
      localStorage.setItem("storageCategory", JSON.stringify([...formCategory, form.category]))
    }
    setForm({ "type": "", "amount": "", "date": "", "description": "", "recurring": "", "category": "" })

  }

  const handleEdit = (id) => {
    setForm(data.filter(item => (item.id == id))[0])
    setData(data.filter(item => (item.id != id)))
    setgivingnewId(false)
  }

  const handleDelete = (id) => {
    setData(data.filter(item => (item.id != id)))
    localStorage.setItem("storage", JSON.stringify(data.filter(item => (item.id != id))))
  }
  const resetFilter = () => {
    setFilter({ "filtertype": "", "filteramount1": "", "filteramount2": "", "filterdate": "", "filterdescription": "", "filterrecurring": "", "filtercategory": "" })
  }

  const totalIncome = data.reduce((initial, item) => initial + ((item.type == "income") ? item.amount : 0), 0);
  const totalExpenses = data.reduce((initial, item) => initial + ((item.type == "expense") ? item.amount : 0), 0);
  const totalBalance = totalIncome - totalExpenses;



  return (
    <>
      <div className="MAINcontainer">
        <div className="logoContainer">
          <div className="Logo Sign">
            &lt;
            <p className="Track">TRACK</p>
            <p className="OP">OP</p>/&gt;
          </div>
          <div className="Line">
            Your Own Expense Tracker
          </div>
        </div>
        <div className="totalContainer">
          <div className="TotalIncome ">
            <h2>Total Income</h2>
            <p>{totalIncome}</p>
          </div>
          <div className="TotalExpense">
            <h2>Total Expenses</h2>
            <p>{totalExpenses}</p>
          </div>
          <div className="TotalBalance">
            <h2>Remaining Balance</h2>
            <p>{totalBalance}</p>
          </div>
        </div>
        <div className="fullformcontainer">
          <h2>Add New Transactions</h2>
          <div className="formContainer">
            <div className='input'>
              <label htmlFor="type" >TYPE</label>
              <select name="type" id="type" value={form.type} onChange={handleChange} >
                <option value="">Please Select</option>
                <option value="income">INCOME</option>
                <option value="expense">EXPENSE</option>
              </select>
            </div>
            <div className='input'>
              <label htmlFor="amount" >AMOUNT</label>
              <input type="text" id="amount" name="amount" className="text" value={form.amount} onChange={handleChange} placeholder=" Enter Amount (integer)" />
            </div>
            <div className='input'>
              <label htmlFor="category" >CATEGORY</label>
              {customCategory == true ? (<input type="text" id="category" name="category" className="text" value={form.category == "custom" ? "" : form.category} onChange={handleChange} placeholder=" Enter Category of Transaction" />) :
                (
                  <select name="category" id="category" value={form.category} onChange={handleChange} >
                    <option value="">Please Select Category</option>
                    {formCategory.map((item, index) => (
                      <option key={index} value={item}>{item}</option>
                    ))}
                    <option value="custom">Custom</option>
                  </select>)}
            </div>
            <div className='input'>
              <label htmlFor="date" >DATE</label>
              <input type="text" id="date" name="date" className="text" value={form.date} onChange={handleChange} placeholder=" Enter Date (DD-MM-YYYY) " />
            </div>
            <div className='input'>
              <label htmlFor="recurring" >RECURRING</label>
              <select name="recurring" id="recurring" value={form.recurring} onChange={handleChange} >
                <option value="">Please Select</option>
                <option value="one-time">One-Time</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
            <div className='input'>
              <label htmlFor="description" >DESCRIPTION</label>
              <textarea id="description" name="description" className="text" value={form.description} onChange={handleChange} placeholder=" Enter Description" ></textarea>
            </div>
            <div className="submitButton">
              <button onClick={() => { handleAdd() }}>ADD TRANSACTION</button>
            </div>
          </div>
        </div>
        <div className="tableContainer">
          <table>
            <thead>
              <tr>
                <th>   <select name="filtertype" id="filtertype" className="filter tabselect" value={filter.filtertype} onChange={handleChangeFilter} >
                  <option value="">Type Filter</option>
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select></th>
                <th><div className="specialFilter"><input type="text" id="filteramount1" name="filteramount1" className="filtertext filter specialfilter" value={filter.filteramount1} onChange={handleChangeFilter} placeholder="From Filter" /><div className="dash"> - </div><input type="text" id="filteramount2" name="filteramount2" className="filtertext filter specialfilter" value={filter.filteramount2} onChange={handleChangeFilter} placeholder="To Filter" /></div></th>
                <th> <select name="filtercategory" id="filtercategory" className="filter tabselect" value={filter.filtercategory} onChange={handleChangeFilter} >
                  <option value="">Category Filter</option>
                  {formCategory.map((item, index) => (
                    <option key={index} value={item}>{item}</option>
                  ))}
                </select></th>
                <th><input type="text" id="filterdate" name="filterdate" className="filtertext filter tabselect" value={filter.filterdate} onChange={handleChangeFilter} placeholder="Date Filter" /></th>
                <th>   <select name="filterrecurring" id="filterrecurring" className="filter tabselect" value={filter.filterrecurring} onChange={handleChangeFilter} >
                  <option value="">Recurring Filter</option>
                  <option value="one-time">One-Time</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select></th>
                <th><input type="text" id="filterdescription" name="filterdescription" className="filtertext filter tabselect" value={filter.filterdescription} onChange={handleChangeFilter} placeholder="Description Filter" /></th>
                <th className="resetTH" colSpan={2}><div className="resetButton"><button onClick={() => { resetFilter() }}>Filter-Reset</button></div></th>
              </tr>
              <tr>
                <th>Type</th>
                <th>Amount</th>
                <th>Category</th>
                <th>Date</th>
                <th>Recurring</th>
                <th>Description</th>
                <th className="editTH">EDIT</th>
                <th className="deleteTH" >DELETE</th>
              </tr>
            </thead>
            {data.map(item => {
              if (
                (filter.filtertype === "" || item.type === filter.filtertype) &&
                (filter.filteramount1 === "" || item.amount > filter.filteramount1) &&
                (filter.filteramount2 === "" || item.amount < filter.filteramount2) &&
                (filter.filterdate === "" || item.date.startsWith(filter.filterdate)) &&
                (filter.filterdescription === "" || item.description.startsWith(filter.filterdescription)) &&
                (filter.filtercategory === "" || item.category === filter.filtercategory) &&
                (filter.filterrecurring === "" || item.recurring === filter.filterrecurring)
              ) {
                return <tbody key={item.id}>
                  <tr>
                    <td>{item.type}</td>
                    <td>{item.amount}</td>
                    <td>{item.category}</td>
                    <td>{item.date}</td>
                    <td>{item.recurring}</td>
                    <td>{item.description}</td>
                    <td className="buttonBox"><button onClick={() => { handleEdit(item.id) }}>       <lord-icon
                      src="https://cdn.lordicon.com/gwlusjdu.json"
                      trigger="hover">
                    </lord-icon></button></td>
                    <td className="buttonBox"><button onClick={() => { handleDelete(item.id) }}>
                      <lord-icon
                        src="https://cdn.lordicon.com/skkahier.json"
                        trigger="hover">
                      </lord-icon></button></td>
                  </tr>
                </tbody>
              }
            })}

          </table>
        </div>
      
        <div className="fullCategoryBarContainer">
          <h2>Income(Sort by Category)</h2>
          <div className="CategoryBarContainer">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartdata.filter(item=>(item.type=="income"))}
                margin={{ top: 10, right: 30, left: 20, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Legend />
                <Tooltip />
                <Bar dataKey="amount" fill="#6f6ae3" activeBar={<Rectangle fill="pink" stroke="blue" />} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="fullCategoryBarContainer">
          <h2>Expense(Sort by Category)</h2>
          <div className="CategoryBarContainer">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartdata.filter(item=>(item.type=="expense"))}
                margin={{ top: 10, right: 30, left: 20, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Legend />
                <Tooltip />
                <Bar dataKey="amount" fill="#318951" activeBar={<Rectangle fill="gold" stroke="purple" />} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

    </>
  );
}
